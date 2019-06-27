import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from '../HomeScreen';
import CalendarScreen from './CalendarScreen';
import HabitsScreen from './HabitsScreen';
import SettingsScreen from './SettingsScreen';
import TodoScreen from './TodoScreen';

const WIDTH = Dimensions.get('window').width;

const dropDownConfig = {
  drawerWidth: WIDTH * 0.83

};

const dropDownMenu = createAppContainer(createDrawerNavigator(
  {
    Home: HomeScreen,
    Calendar: CalendarScreen,
    Todo: TodoScreen,
    Habits: HabitsScreen,
    settings: SettingsScreen
  },
  dropDownConfig
));

export default dropDownMenu;
