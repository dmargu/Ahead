import React, { Component } from 'react';
import { View, FlatList, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import { addTodo, toggleTodo, removeTodo } from '../../actions';


const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

class MainTodo extends Component {
  constructor() {
    super();
    this.state = {
      textInput: ''
    };
  }

  addTodo() {
    if (this.state.textInput !== '') {
      this.props.addTodo(this.state.textInput);
    }
    this.setState({ textInput: '' });
    return;
  }

  onTogglePress(item) {
    this.props.toggleTodo(item.id);
  }

  deleteTodo(item) {
    this.props.removeTodo(item.id);
  }

  render() {
    return (
      <View style={{ height: HEIGHT }}>
          <AddTodo
            textChange={textInput => this.setState({ textInput })}
            addNewTodo={this.addTodo.bind(this)}
            textInput={this.state.textInput}
          />
          <FlatList
            data={this.props.todos}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <TodoItem
                  todoItem={item}
                  pressToToggle={() => this.props.toggleTodo(item)}
                  deleteTodo={() => this.props.removeTodo(item)}
                />
              );
            }}
          />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.TodoReducer.todos
  };
}

export default connect(mapStateToProps, { addTodo, toggleTodo, removeTodo })(MainTodo);
