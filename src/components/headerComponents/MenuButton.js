import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';

class MenuButton extends Component {
  render() {
    return (
      <Ionicons
        name='md-arrow-forward'
        size={32}
        onPress={() => this.props.navigation.toggleDrawer()}
      />
    );
  }
}

export default MenuButton;
