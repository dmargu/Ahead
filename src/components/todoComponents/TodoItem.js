import React, { Component } from 'react';
import { StyleSheet, Text, Button, TouchableOpacity, View } from 'react-native';

class TodoItem extends Component {
  render() {
    const todoItem = this.props.todoItem;
    return (
      <View>
        <TouchableOpacity
          style={styles.todoItem}
          onPress={this.props.pressToToggle}
        >
          <Text
            style={{
              color: todoItem.completed ? '#aaaaaa' : '#f5f5f5',
              textDecorationLine: todoItem.completed ? 'line-through' : 'none',
              fontSize: 16 }}
          >
            {todoItem.text}
          </Text>
            <Button
              title='Remove'
              color='#ff5330'
              onPress={this.props.deleteTodo}
            />
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  todoItem: {
    width: '100%',
    height: 50,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15
  }
});

export default TodoItem;
