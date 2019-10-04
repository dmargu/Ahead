import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Header from '../components/common/Header';
import TodayIncludes from '../components/TodayIncludes';
import MainTodo from '../components/todoComponents/mainTodo';
import { registerForPushNotificationsAsync } from '../functions/pushNotificationsRegister';

const HEIGHT = Dimensions.get('window').height;

class HomeScreen extends Component {
  componentDidMount() {
    registerForPushNotificationsAsync();
  }
  render() {
    return (
      <View style={{ flex: 1, height: HEIGHT }}>
        <Header navigation={this.props.navigation} screenName='Home' />
        <TodayIncludes />
        <MainTodo />
      </View>
    );
  }
}

export default HomeScreen;
