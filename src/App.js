import React, { Component } from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import dropDownMenu from './screens/dropDownScreens/dropDownMenu';


export default class App extends Component {
  render() {
    const AppContainer = createAppContainer(createBottomTabNavigator({
      welcome: {
          screen: WelcomeScreen,
          // navigationOptions: { tabBarVisible: false }
        },
        auth: {
          screen: AuthScreen,
          // navigationOptions: { tabBarVisible: false }
        },
        main: {
          // navigationOptions: { tabBarVisible: false },
          screen: dropDownMenu
        }
    }));

    return (
        <AppContainer />
    );
  }
}
