import React, { Component } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class ReminderToggle extends Component {
  render() {
    return (
      <View>
      <Ionicons
        name='md-checkbox-outline'
        size={32}
        color='#f5f5f5'
      />
      </View>
    );
  }
}

export default ReminderToggle;
