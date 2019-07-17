import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MenuButton from '../headerComponents/MenuButton';
import PlusButton from '../headerComponents/PlusButton';
import ReminderToggle from '../headerComponents/ReminderToggle';


// make a component
class Header extends Component {
  render() {
    return (
      <View style={styles.viewStyle}>
          <MenuButton navigation={this.props.navigation} />
          <PlusButton />
          <ReminderToggle />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    paddingTop: 35,
    paddingLeft: 25,
    paddingRight: 25
  },
  textStyle: {
    fontSize: 20
  },
});

export default Header;
