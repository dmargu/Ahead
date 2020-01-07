import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles';

class MenuButton extends Component {
  render() {
    return (
      <Ionicons
        name="md-menu"
        size={32}
        onPress={() => this.props.navigation.toggleDrawer()}
        color={colors.mainLightText}
      />
    );
  }
}

export default MenuButton;
