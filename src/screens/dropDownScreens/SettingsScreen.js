import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import SignOutButton from '../../components/authComponents/SignOutButton';

class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} screenName='Settings' />
        <View style={styles.signOutButtonContainer}>
          <SignOutButton />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signOutButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SettingsScreen;
