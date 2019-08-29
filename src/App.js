import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import '@firebase/firestore';
import {
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import dropDownMenu from './screens/dropDownScreens/dropDownMenu';
import reducers from './reducers';
import NavigationService from './NavigationService';


export default class App extends Component {
  componentDidMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyB8pL-BYXOFV1yDAJwKAY_1U4Ol9pZF5fI',
      authDomain: 'ahead-d1dba.firebaseapp.com',
      databaseURL: 'https://ahead-d1dba.firebaseio.com',
      projectId: 'ahead-d1dba',
      storageBucket: 'ahead-d1dba.appspot.com',
      messagingSenderId: '281124008705',
      appId: '1:281124008705:web:085d4c79834530b4'
    };
    firebase.initializeApp(firebaseConfig);
    global.dbRoot = firebase.firestore().collection('users');
  } //call global.dbRoot
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
    /*eslint-disable no-undef*/
    //eslint-disable-next-line no-underscore-dangle
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /*eslint-enable no-undef*/
    const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(ReduxThunk)));
    return (
      <Provider store={store}>
        <LinearGradient colors={['#28313B', '#485461']} style={{ flex: 1 }}>
          <AppContainer
            ref={navigatorRef => {
              NavigationService.setNavigator(navigatorRef);
            }}
          />
        </LinearGradient>
      </Provider>
    );
  }
}
