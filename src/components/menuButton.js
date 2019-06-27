import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class MenuButton extends Component {
  render() {
    return (
      <Ionicons
        name='md-arrow-forward'
        size={32}
        style={styles.menuIcon}
        onPress={() => this.props.navigation.toggleDrawer()}
      />
    );
  }
}

const styles = StyleSheet.create({
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    left: 20
  }
});

export default MenuButton;
