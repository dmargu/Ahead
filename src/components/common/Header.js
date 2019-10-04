import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MenuButton from '../headerComponents/MenuButton';
import ReminderToggle from '../headerComponents/ReminderToggle';


// make a component
class Header extends Component {
  render() {
    return (
      <View style={styles.viewStyle}>
          <MenuButton navigation={this.props.navigation} />
          <Text style={styles.screenTitle}>{this.props.screenName}</Text>
          <ReminderToggle />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: 'black',
    borderBottomWidth: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: '#252e38'
  },
  textStyle: {
    fontSize: 20
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fcefef'
  }
});

export default Header;
