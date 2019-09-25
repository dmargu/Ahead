import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from '../HomeScreen';
import CalendarScreen from './CalendarScreen';
import HabitsScreen from './HabitsScreen';
import SettingsScreen from './SettingsScreen';
import TodoScreen from './TodoScreen';
import MenuDrawer from '../../components/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const dropDownConfig = {
  drawerWidth: WIDTH * 0.83,
  contentComponent: ({ navigation }) => { // takes navigation props so it can change screens
    return <MenuDrawer navigation={navigation} />;
  },
};
// creates drop down menu with all of screens, home needs to be first
const dropDownMenu = createAppContainer(createDrawerNavigator(
  {
    Home: HomeScreen,
    Calendar: CalendarScreen,
    Todo: TodoScreen,
    Habits: HabitsScreen,
    Settings: SettingsScreen,
  },
  dropDownConfig,
));

export default dropDownMenu;
