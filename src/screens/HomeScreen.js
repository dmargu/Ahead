import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import Header from '../components/common/Header';
import TodayIncludes from '../components/TodayIncludes';
import MainTodo from '../components/todoComponents/mainTodo';

const HEIGHT = Dimensions.get('window').height;

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, height: HEIGHT }}>
        <ScrollView>
          <Header navigation={this.props.navigation} />
          <TodayIncludes />
          <MainTodo />
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;
