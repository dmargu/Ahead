import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  DatePickerAndroid,
  TimePickerAndroid
} from 'react-native';

class AndroidDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosenAndroidTime: '00:00',
      androidDate: new Date()
    };
  }

  setDateAndroid = async () => {
    try {
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open({
      date: new Date(),
      minDate: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ androidDate: `${day}/${month + 1}/${year}` });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  setTimeAndroid = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        const m = (minute < 10) ? `0${minute}` : minute;
        const h = (hour < 10) ? `0${hour}` : hour;
        console.log(`time: ${hour}:${minute}`);
        this.setState({ chosenAndroidTime: `${h}:${m}` });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.setDateAndroid()}>
          <View>
            <Text>{this.state.androidDate}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setTimeAndroid()}>
          <View>
            <Text>{this.state.chosenAndroidTime}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AndroidDatePicker;
