import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AutoComplete from './autocomplete/autocomplete';

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Grape',
  'Orange',
  'Pear',
  'Strawberry'
];

// This is a demo app for the AutoComplete component.
export default class App extends Component {
  state = {fruit: ''};

  onSelect = text => this.setState({fruit: text});

  render() {
    const {fruit} = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text>Before #1</Text>
          <Text>Before #2</Text>
          <Text>Before #3</Text>
        </View>
        <AutoComplete
          label="Fruit"
          onSelect={this.onSelect}
          options={fruits}
          value={fruit}
        />
        <View>
          <Text>After #1</Text>
          <Text>After #2</Text>
          <Text>After #3</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50
  }
});
