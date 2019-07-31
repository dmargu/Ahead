import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import dropDownMenu from './screens/dropDownScreens/dropDownMenu';
import reducers from './reducers';


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
        navigationOptions: { tabBarVisible: false },
        screen: dropDownMenu,
      },
    }));
    /* eslint-disable no-underscore-dangle */
    /* eslint-disable no-undef */
    const store = createStore(reducers, {},
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    /* eslint-enable */
    return (
      <Provider store={store}>
        <LinearGradient colors={['#3a4347', '#3a4347']} style={{ flex: 1 }}>
          <AppContainer />
        </LinearGradient>
      </Provider>
    );
  }
}
