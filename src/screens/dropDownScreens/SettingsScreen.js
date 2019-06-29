import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../components/common/Header';

class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />
      </View>
    );
  }
}

export default SettingsScreen;
