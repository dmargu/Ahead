import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../components/common/Header';
import TodayIncludes from '../components/TodayIncludes';

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header navigation={this.props.navigation} />
        <TodayIncludes />
      </View>
    );
  }
}

export default HomeScreen;
