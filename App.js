import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AutoComplete from './autocomplete/autocomplete';
import AutoComplete2 from './autocomplete/autocomplete2';

const fruits = [
  'Apple',
  'Banana',
  'Cherry',
  'Grape',
  'Orange',
  'Pear',
  'Strawberry'
];

export default class App extends Component {
  state = {fruit: ''};

  onSelect = text => this.setState({fruit: text});

  render() {
    const {fruit} = this.state;
    return (
      <View style={styles.container}>
        {/* <AutoComplete
          label="Fruit"
          onSelect={this.onSelect}
          options={fruits}
          value={fruit}
        /> */}
        <AutoComplete2
          label="Fruit"
          onSelect={this.onSelect}
          options={fruits}
          value={fruit}
        />
        {/* The presence of these prevents selecting any option at the same y! */}
        {/* <View pointerEvents="none"> */}
        <Text>After #1</Text>
        <Text>After #2</Text>
        <Text>After #3</Text>
        {/* </View> */}
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
