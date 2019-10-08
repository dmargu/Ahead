import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import firebase from 'firebase';
import '@firebase/firestore';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreen } from 'expo';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import dropDownMenu from './screens/dropDownScreens/dropDownMenu';
import NavigationService from './NavigationService';
import storeConfiguration from './store';

export default class App extends Component {
  constructor() {
    super();
    SplashScreen.preventAutoHide();
  }
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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        NavigationService.navigate('main', null);
      }
      SplashScreen.hide();
    });
    global.dbRoot = firebase.firestore().collection('users');
  }
  render() {
    const AppContainer = createAppContainer(createBottomTabNavigator({
      /*welcome: {
        screen: WelcomeScreen,
        navigationOptions: { tabBarVisible: false }
      },*/
      auth: {
        screen: AuthScreen,
        navigationOptions: { tabBarVisible: false }
      },
      main: {
        navigationOptions: { tabBarVisible: false },
        screen: dropDownMenu,
      },
    }));

    const { persistor, store } = storeConfiguration();
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <LinearGradient colors={['#28313B', '#485461']} style={{ flex: 1 }}>
          <AppContainer
            ref={navigatorRef => {
              NavigationService.setNavigator(navigatorRef);
            }}
          />
        </LinearGradient>
        </PersistGate>
      </Provider>
    );
  }
}
