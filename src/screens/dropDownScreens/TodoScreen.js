import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../../components/common/Header';
import MainTodo from '../../components/todoComponents/mainTodo';

class TodoScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />
          <MainTodo />
      </View>
    );
  }
}

export default TodoScreen;
