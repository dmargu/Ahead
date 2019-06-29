import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class PlusButton extends Component {
  render() {
    return (
      <View>
      <Ionicons
        name='md-add'
        size={32}
      />
      </View>
    );
  }
}

export default PlusButton;
