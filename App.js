import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AutoComplete from './AutoComplete';

const fruits = [
  {id: 'a', name: 'Apple'},
  {id: 'b', name: 'Banana'},
  {id: 'c', name: 'Cherry'},
  {id: 'g', name: 'Grape'},
  {id: 'o', name: 'Orange'},
  {id: 'p', name: 'Pear'},
  {id: 's', name: 'Strawberry'}
];

// This simulates getting options with a REST call.
async function getFruits(value) {
  return new Promise(resolve => {
    setTimeout(() => {
      const lowerValue = value.toLowerCase();
      const options = fruits.filter(fruit =>
        fruit.name.toLowerCase().includes(lowerValue)
      );
      resolve(options);
    }, 100);
  });
}

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
          keyExtractor={fruit => fruit.id}
          label="Fruit"
          onSelect={this.onSelect}
          optionExtractor={fruit => fruit.name}
          options={getFruits}
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
