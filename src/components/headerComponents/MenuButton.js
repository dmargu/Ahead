import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';

class MenuButton extends Component {
  render() {
    return (
      <Ionicons
        name="md-menu"
        size={32}
        onPress={() => this.props.navigation.toggleDrawer()}
        color='#f5f5f5'
      />
    );
  }
}

export default MenuButton;
