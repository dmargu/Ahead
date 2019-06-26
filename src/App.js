import React, { Component } from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/dropDown/CalendarScreen';
import HabitsScreen from './screens/dropDown/HabitsScreen';
import SettingsScreen from './screens/dropDown/SettingsScreen';
import TodoScreen from './screens/dropDown/TodoScreen';


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
          screen: createBottomTabNavigator({
            home: {
              screen: HomeScreen,
              // navigationOptions: { tabBarVisible: false }
            },
            dropDown: {
              screen: createDrawerNavigator({
                todo: TodoScreen,
                habits: HabitsScreen,
                calendar: CalendarScreen,
                settings: SettingsScreen
              })
            }
          })
        }
    }));

    return (
        <AppContainer />
    );
  }
}
