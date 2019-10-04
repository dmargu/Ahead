import React, { Component } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import { addTodo, removeTodo } from '../../actions';
import FloatingPlusButton from '../FloatingPlusButton';


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

  onFloatingButtonPress() {
    this.textInputField.focus();
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAccessoryView>
          <View>
            <AddTodo
              textChange={textInput => this.setState({ textInput })}
              addNewTodo={this.addTodo.bind(this)}
              textInput={this.state.textInput}
              ref={(ref) => { this.textInputField = ref; }}
            />
          </View>
        </KeyboardAccessoryView>
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
        <FloatingPlusButton tapToAddEvent={this.onFloatingButtonPress.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    height: HEIGHT
  }
});

function mapStateToProps(state) {
  return {
    todos: state.TodoReducer.todos
  };
}

export default connect(mapStateToProps, { addTodo, removeTodo })(MainTodo);
