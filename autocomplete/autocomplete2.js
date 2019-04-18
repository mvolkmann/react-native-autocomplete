import {arrayOf, func, string} from 'prop-types';
import React, {Component} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const identity = value => value;

export default class AutoComplete2 extends Component {
  static propTypes = {
    label: string,
    onSelect: func.isRequired,
    options: arrayOf(string).isRequired,
    value: string.isRequired
  };

  state = {
    inputHeight: 0,
    showList: false,
    value: ''
  };

  // onBlur = () => {
  //   const {filteredColors} = this.state;
  //   if (filteredColors.length === 1) this.setState({color: filteredColors[0]});
  // };

  onChangeText = value => {
    this.setState({showList: true, value});
  };

  onLayout = event => {
    const {height} = event.nativeEvent.layout;
    this.setState({inputHeight: height});
  };

  onValueChange = value => {
    //Alert.alert('onValueChanged called', 'value = ' + value);
    this.setState({showList: false, value});
  };

  renderItem = item => {
    const text = item.item;
    return (
      <Text
        key={text}
        onPress={() => this.onValueChange(text)}
        style={styles.suggestion}
      >
        {text}
      </Text>
    );
  };

  render() {
    const {inputHeight, showList, value} = this.state;
    const {label, options} = this.props;
    const suggestions = options.filter(option => option.includes(value));

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={{flexGrow: 1}}>
          <TextInput
            autoCapitalize="none"
            onChangeText={this.onChangeText}
            onFocus={() => this.setState({showList: true})}
            onLayout={this.onLayout}
            style={styles.textInput}
            value={value}
          />
          {showList && (
            <FlatList
              data={suggestions}
              keyExtractor={identity}
              renderItem={this.renderItem}
              style={[styles.flatList, {top: inputHeight - 1}]}
            >
              {suggestions.map(suggestion => (
                <TouchableOpacity
                  key={suggestion}
                  onPress={() => this.onValueChange(suggestion)}
                >
                  <Text style={styles.suggestion}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </FlatList>
          )}
        </View>
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
  flatList: {
    borderColor: 'gray',
    borderWidth: 1,
    left: 0,
    maxHeight: 120,
    padding: 10,
    paddingBottom: 20,
    position: 'absolute',
    zIndex: 1
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10
  },
  suggestion: {
    color: 'black',
    fontSize: 24
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
