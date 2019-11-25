import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../components/common/Header';

class ClassesScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} screenName='Classes' />
      </View>
    );
  }
}

export default ClassesScreen;
