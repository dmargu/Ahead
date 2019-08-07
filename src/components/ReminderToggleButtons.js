import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

class ReminderToggleButtons extends Component {
  render() {
    return (
      <View
        style={{ flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
              }}
      >
        <Button
          title='10 min'
        />
        <Button
          title='30 min'
        />
        <Button
          title='1 hour'
        />
        <Button
          title='1 day'
        />
      </View>
    );
  }
}

export default ReminderToggleButtons;
