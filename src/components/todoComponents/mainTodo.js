import React, { Component } from 'react';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import TodoItem from './TodoItem';
import EmptyListComponent from '../EmptyListComponent';
import { removeTodo } from '../../actions';

const HEIGHT = Dimensions.get('window').height;

class MainTodo extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <FlatList
          data={_.sortBy(this.props.todos, (item) => { //not working correctly
            return item.date;
          })}
          extraData={this.props.todos}
          keyExtractor={item => item.id}
          ListEmptyComponent={<EmptyListComponent text='Nothing to do! Congrats, what else you got?' />}
          renderItem={({ item }) => {
            return (
              <TodoItem
                todoItem={item}
                deleteTodo={() => this.props.removeTodo(item)}
              />
            );
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    height: HEIGHT,
    position: 'relative',
    zIndex: 10
  },
});

function mapStateToProps(state) {
  return {
    todos: state.TodoReducer.todos,
  };
}

export default connect(mapStateToProps, { removeTodo })(MainTodo);
