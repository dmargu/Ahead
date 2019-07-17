import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../components/common/Header';
import TodayIncludes from '../components/TodayIncludes';
import MainTodo from '../components/todoComponents/mainTodo';


class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
          <Header navigation={this.props.navigation} />
          <TodayIncludes />
          <MainTodo />
      </View>
    );
  }
}

export default HomeScreen;
