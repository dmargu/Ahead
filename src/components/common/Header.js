import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import MenuButton from '../headerComponents/MenuButton';
import { colors } from '../../styles';

class MainHeader extends Component {
  render() {
    return (
      <View>
        <Header
          leftComponent={<MenuButton navigation={this.props.navigation} />}
          centerComponent={<Text style={styles.screenTitle}>{this.props.screenName}</Text>}
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
    borderWidth: 0.25,
    borderColor: colors.mainDark
  },
  textStyle: {
    fontSize: 20
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b6c3cc'
  },
});

export default MainHeader;
