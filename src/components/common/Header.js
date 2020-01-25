import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import MenuButton from '../headerComponents/MenuButton';
import ConnectButton from '../headerComponents/ConnectButton';
import { colors, fonts } from '../../styles';

class MainHeader extends Component {
  render() {
    return (
      <View>
        <Header
          leftComponent={<MenuButton navigation={this.props.navigation} />}
          centerComponent={<Text style={styles.screenTitle}>{this.props.screenName}</Text>}
          rightComponent={<ConnectButton />}
          backgroundColor={colors.mainDark}
          containerStyle={styles.viewStyle}
          barStyle='light-content'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    borderBottomWidth: 0.25,
    borderBottomColor: colors.darkGrey,
  },
  textStyle: {
    fontSize: 20
  },
  screenTitle: {
    fontSize: fonts.headerText,
    fontWeight: 'bold',
    color: colors.mainLightText,
    fontFamily: fonts.fontFamily
  },
});

export default MainHeader;
