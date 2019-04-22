import {arrayOf, func, oneOfType, string} from 'prop-types';
import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';

export default class AutoComplete extends Component {
  static propTypes = {
    label: string,
    onSelect: func.isRequired,
    options: oneOfType([arrayOf(string), func]).isRequired,
    value: string.isRequired
  };

  state = {inputLayout: {}, realOptions: [], showList: false};

  componentDidMount() {
    this.loadOptions();
  }

  componentDidUpdate() {
    this.loadOptions();
  }

  loadOptions = async () => {
    let {options, value} = this.props;

    if (typeof options === 'function') {
      try {
        options = await options(value);
      } catch (e) {
        throw new Error('AutoComplete getOptions failed: ' + e.message);
      }
    } else if (!Array.isArray(options)) {
      throw new Error('AutoComplete options must be an array or function');
    }

    this.updateOptions(options);
  };

  onChangeText = value => {
    this.setState({showList: true});
    this.props.onSelect(value);
  };

  onLayout = event => {
    const {layout} = event.nativeEvent;
    this.setState({inputLayout: layout});
  };

  onValueChange = value => {
    this.setState({showList: false});
    this.props.onSelect(value);
  };

  renderSuggestion = ({item}) => (
    <Text style={styles.suggestion} onPress={() => this.onValueChange(item)}>
      {item}
    </Text>
  );

  updateOptions(options) {
    const {realOptions} = this.state;
    const same =
      options.length === realOptions.length &&
      options.every((option, index) => option === realOptions[index]);
    if (!same) this.setState({realOptions: options});
  }

  render() {
    const {inputLayout, realOptions, showList} = this.state;
    const {label, value} = this.props;

    const suggestions = realOptions.filter(option => option.includes(value));

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
