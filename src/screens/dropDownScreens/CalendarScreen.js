import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../components/common/Header';
import Calendar from '../../components/Calendar';

class CalendarScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />
        <Calendar />
      </View>
    );
  }
}

export default CalendarScreen;
