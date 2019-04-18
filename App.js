import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AutoComplete from './autocomplete/autocomplete';
import AutoComplete2 from './autocomplete/autocomplete2';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

export default class App extends Component {
  state = {partialColor: ''};

  onSelect = text => this.setState({partialColor: text});

  render() {
    const {partialColor} = this.state;
    return (
      <View style={styles.container}>
        <AutoComplete
          label="Color"
          onSelect={this.onSelect}
          options={colors}
          value={partialColor}
        />
        <AutoComplete2
          label="Color"
          onSelect={this.onSelect}
          options={colors}
          value={partialColor}
        />
        <Text>After #1</Text>
        <Text>After #2</Text>
        <Text>After #3</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50
  },
  acv: {
    borderColor: 'red',
    borderWidth: 3
  }
});
