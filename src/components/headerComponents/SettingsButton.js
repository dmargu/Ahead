import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from 'react-navigation';

class SettingsButton extends Component {
  render() {
    return (
      <Ionicons
        name="md-settings"
        size={32}
        //onPress={() => this.props.navigation.navigate('settings')}
        color='#CDD2C9'
      />
    );
  }
}

export default SettingsButton;
