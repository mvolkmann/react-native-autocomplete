import {arrayOf, func, string} from 'prop-types';
import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';

export default class AutoComplete extends Component {
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

  renderSuggestion = ({item}) => (
    <Text style={styles.suggestion} onPress={() => this.onValueChange(item)}>
      {item}
    </Text>
  );

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
          <FlatList
            data={suggestions}
            keyboardShouldPersistTaps="handled"
            keyExtractor={item => item}
            renderItem={this.renderSuggestion}
            style={[styles.scrollView, positionStyle]}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    zIndex: 1 // critical!
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10
  },
  scrollView: {
    borderColor: 'gray',
    borderWidth: 1,
    maxHeight: 160, // 4 items
    position: 'absolute'
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
