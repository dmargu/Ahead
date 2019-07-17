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
    const store = createStore(reducers, {},
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    /* eslint-enable */
    return (
      <Provider store={store}>
        <LinearGradient colors={['#B993D6', '#8CA6DB']} style={{ flex: 1 }}>
          <AppContainer />
        </LinearGradient>
      </Provider>
    );
  }
}
