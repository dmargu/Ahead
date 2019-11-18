import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MenuButton from '../headerComponents/MenuButton';

class Header extends Component {
  render() {
    return (
      <View style={styles.viewStyle}>
          <MenuButton navigation={this.props.navigation} />
          <Text style={styles.screenTitle}>{this.props.screenName}</Text>
          <Text style={styles.premium}>P</Text>
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
    shadowOffset: { width: 0.5, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    //backgroundColor: '#fcefef'
  },
  textStyle: {
    fontSize: 20
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cdd2c9'
  },
  premium: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#cdd2c9'
  }
});

export default Header;
