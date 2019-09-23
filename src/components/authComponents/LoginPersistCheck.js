import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { SplashScreen } from 'expo';
import NavigationService from '../../NavigationService';

class LoginPersistCheck extends Component {
  async componentDidMount() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        NavigationService.navigate('main', null);
      } else {
        NavigationService.navigate('auth');
      }
      SplashScreen.hide();
    });
  }
  render() {
    return (
      <View />
    );
  }
}

export default LoginPersistCheck;
