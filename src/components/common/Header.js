import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import MenuButton from '../headerComponents/MenuButton';
//import SettingsButton from '../headerComponents/SettingsButton';

class MainHeader extends Component {
  render() {
    return (
      <View>
        <Header
          leftComponent={<MenuButton navigation={this.props.navigation} />}
          centerComponent={<Text style={styles.screenTitle}>{this.props.screenName}</Text>}
          backgroundColor={'#db5461'}
          containerStyle={styles.viewStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    shadowColor: 'black',
    shadowOffset: { width: 0.5, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  textStyle: {
    fontSize: 20
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fcefef'
  },
});

export default MainHeader;
