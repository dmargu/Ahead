import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  tenMinReminder,
  thirtyMinReminder,
  oneHourReminder,
  oneDayReminder
} from '../actions/ReminderActions';

class ReminderToggleButtons extends Component {
  render() {
    const item = this.props.item;
    return (
      <View //need to think about adding a button for start time
        style={{ flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
              }}
      >
        <Button
          title='10 min'
          type={item.tenMinReminder ? 'solid' : 'outline'}
          onPress={() => this.props.tenMinReminder(item)}
        />
        <Button
          title='30 min'
          type={item.thirtyMinReminder ? 'solid' : 'outline'}
          onPress={() => this.props.thirtyMinReminder(item)}
        />
        <Button
          title='1 hour'
          type={item.oneHourReminder ? 'solid' : 'outline'}
          onPress={() => this.props.oneHourReminder(item)}
        />
        <Button
          title='1 day'
          type={item.oneDayReminder ? 'solid' : 'outline'}
          onPress={() => this.props.oneDayReminder(item)}
        />
      </View>
    );
  }
}

export default connect(null,
  { tenMinReminder, thirtyMinReminder, oneDayReminder, oneHourReminder })(ReminderToggleButtons);
