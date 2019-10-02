import React, { Component } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import { addTodo, removeTodo } from '../../actions';


const HEIGHT = Dimensions.get('window').height;

class MainTodo extends Component {
  constructor() {
    super();
    this.state = {
      textInput: '',
      items: []
    };
  }

  addTodo() {
    if (this.state.textInput !== '') {
      this.props.addTodo(this.state.textInput);
    }
    this.setState({ textInput: '' });
    return;
  }
  
  render() {
    return (
      <View style={{ height: HEIGHT }}>
          <AddTodo
            textChange={textInput => this.setState({ textInput })}
            addNewTodo={this.addTodo.bind(this)}
            textInput={this.state.textInput}
          />
          <View style={styles.listContainer}>
            <FlatList
              data={_.sortBy(this.props.todos, (item) => {
                return item.date;
              })}
              extraData={this.props.todos}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                return (
                  <TodoItem
                    todoItem={item}
                    deleteTodo={() => this.props.removeTodo(item)}
                  />
                );
              }}
            />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginBottom: 120
  }
});

function mapStateToProps(state) {
  return {
    todos: state.TodoReducer.todos
  };
}

export default connect(mapStateToProps, { addTodo, removeTodo })(MainTodo);
