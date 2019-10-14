import React, { Component } from 'react';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  InputAccessoryView,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
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
      inputVisible: true
    };
  }

  componentDidMount() {
    this.keyboardDidHideListener =
      Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    this.setState({ inputVisible: false });
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  keyboardDidHide() {
    this.setState({ inputVisible: false });
  }

  addTodo() {
    if (this.state.textInput !== '') {
      this.props.addTodo(this.state.textInput);
    }
    this.setState({ textInput: '' });
    return;
  }

  onFloatingButtonPress() {
    this.setState({ inputVisible: true }, () => { this.textInputField.focus(); });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
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
          <InputAccessoryView>
            { this.state.inputVisible &&
              <AddTodo
                textChange={textInput => this.setState({ textInput })}
                addNewTodo={this.addTodo.bind(this)}
                textInput={this.state.textInput}
                ref={(ref) => { this.textInputField = ref; }}
              />
            }
          </InputAccessoryView>
          { !this.state.inputVisible &&
            <FloatingPlusButton tapToAddEvent={this.onFloatingButtonPress.bind(this)} />
          }

      </KeyboardAvoidingView>
    );
  }
} //use react native keybord accessory for cross-platform solution
  // will need to move add todo to the root view component in home screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    height: HEIGHT,
    position: 'relative',
    zIndex: 10
  }
});

function mapStateToProps(state) {
  return {
    todos: state.TodoReducer.todos
  };
}

export default connect(mapStateToProps, { addTodo, removeTodo })(MainTodo);
