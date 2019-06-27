import React, { Component } from 'react';
import { View } from 'react-native';
import MenuButton from '../components/menuButton';

class HomeScreen extends Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <MenuButton navigation={this.props.navigation} />
      </View>
    );
  }
}

export default HomeScreen;
