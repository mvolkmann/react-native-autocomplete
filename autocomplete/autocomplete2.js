import {arrayOf, func, string} from 'prop-types';
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

export default class AutoComplete2 extends Component {
  static propTypes = {
    label: string,
    onSelect: func.isRequired,
    options: arrayOf(string).isRequired,
    value: string.isRequired
  };

  state = {inputLayout: {}, showList: false, value: ''};

  onChangeText = value => {
    this.setState({showList: true, value});
  };

  onLayout = event => {
    const {layout} = event.nativeEvent;
    this.setState({inputLayout: layout});
  };

  onValueChange = value => {
    this.setState({showList: false, value});
  };

  render() {
    const {inputLayout, showList, value} = this.state;
    const {label, options} = this.props;
    const suggestions = options.filter(option => option.includes(value));

    const positionStyle = {
      left: inputLayout.x,
      top: inputLayout.height - 1
    };

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          onChangeText={this.onChangeText}
          onFocus={() => this.setState({showList: true})}
          onLayout={this.onLayout}
          style={styles.textInput}
          value={value}
        />
        {showList && (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={[styles.scrollView, positionStyle]}
          >
            {suggestions.map(suggestion => (
              <Text
                key={suggestion}
                style={styles.suggestion}
                onPress={() => this.onValueChange(suggestion)}
              >
                {suggestion}
              </Text>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10
  },
  scrollView: {
    borderColor: 'gray',
    borderWidth: 1,
    maxHeight: 120, // 4 items
    position: 'absolute',
    zIndex: 1
  },
  suggestion: {
    color: 'black',
    fontSize: 24,
    margin: 5
  },
  textInput: {
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    flexGrow: 1,
    fontSize: 24,
    padding: 4
  }
});
