import {arrayOf, func, string} from 'prop-types';
import React, {Component} from 'react';
import {Picker, StyleSheet, Text, TextInput, View} from 'react-native';

export default class AutoComplete extends Component {
  static propTypes = {
    label: string,
    onSelect: func.isRequired,
    options: arrayOf(string).isRequired,
    value: string.isRequired
  };

  state = {
    showPicker: false,
    value: ''
  };

  // onBlur = () => {
  //   const {filteredColors} = this.state;
  //   if (filteredColors.length === 1) this.setState({color: filteredColors[0]});
  // };

  onChangeText = value => {
    this.setState({showPicker: true, value});
  };

  onValueChange = value => {
    if (value === '') return;
    this.setState({showPicker: false, value});
  };

  render() {
    const {showPicker, value} = this.state;
    const {label, options} = this.props;
    const suggestions = options.filter(option => option.includes(value));
    suggestions.unshift('');

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            autoCapitalize="none"
            onBlur={() => this.setState({showPicker: false})}
            onChangeText={this.onChangeText}
            onFocus={() => this.setState({showPicker: true})}
            style={styles.textInput}
            value={value}
          />
        </View>
        {showPicker && (
          <Picker enabled onValueChange={this.onValueChange} selectedValue="">
            {suggestions.map(suggestion => (
              <Picker.Item
                key={suggestion}
                label={suggestion}
                mode="dialog"
                value={suggestion}
              />
            ))}
          </Picker>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
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
