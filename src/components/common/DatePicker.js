import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

class DatePicker extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false
    };
  }

  handlePicker() {
    console.log('confirmed');
  }

  showPicker() {
    this.setState({
      isVisible: true
    });
  }

  hidePicker() {
    this.setState({
      isVisible: false
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.showPicker.bind(this)}
        >
          <Text style={styles.text}>Show date picker</Text>
        </TouchableOpacity>
        <RNDateTimePicker
          isVisible={this.state.isVisible}
          onConfirm={this.handlePicker.bind(this)}
          onCancel={this.hidePicker.bind(this)}
          value={new Date()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 15
  },
  text: {
    fontSize: 18,
    color: '#f5f5f5',
    textAlign: 'center'
  }
});

export default DatePicker;
