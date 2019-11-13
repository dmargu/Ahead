import React, { Component } from 'react';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  InputAccessoryView,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Text,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
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
  //this component isn't working right.
  /*shouldComponentUpdate() {
    if (this.props.dateModalVisible) {
      return false;
    }
    return true;
  }*/

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
    const headerString = 'To-Do\'s';
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    {/*<ScrollView>*/}
          <View style={styles.headerViewStyle}>
            <Text style={styles.headerTextStyle}>{headerString}</Text>
          </View>

          <FlatList
            data={_.sortBy(this.props.todos, (item) => {
              return item.date;
            })}
            extraData={this.props.todos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
            //  if (moment().isSame(item.date, 'day')) {
                return (
                  <TodoItem
                    todoItem={item}
                    deleteTodo={() => this.props.removeTodo(item)}
                  />
                );
            //  }
            }}
          />
    {/*      <View style={styles.headerViewStyle}>
            <Text style={styles.headerTextStyle}>Tomorrow</Text>
          </View>

          <FlatList
            data={_.sortBy(this.props.todos, (item) => {
              return item.date;
            })}
            extraData={this.props.todos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              if (moment().add(1, 'day').isSame(item.date, 'day')) {
                return (
                  <TodoItem
                    todoItem={item}
                    deleteTodo={() => this.props.removeTodo(item)}
                  />
                );
              }
            }}
          />

          <View style={styles.headerViewStyle}>
            <Text style={styles.headerTextStyle}>Upcoming</Text>
          </View>

          <FlatList
            data={_.sortBy(this.props.todos, (item) => {
              return item.date;
            })}
            extraData={this.props.todos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              if (moment().add(1, 'day').isBefore(item.date, 'day')) {
                return (
                  <TodoItem
                    todoItem={item}
                    deleteTodo={() => this.props.removeTodo(item)}
                  />
                );
              }
            }}
          />

          <View style={styles.headerViewStyle}>
            <Text style={styles.headerTextStyle}>Sometime</Text>
          </View>

          <FlatList
            data={_.sortBy(this.props.todos, (item) => {
              return item.date;
            })}
            extraData={this.props.todos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              if (moment().isAfter(item.date, 'day') || item.date === null) {
                return (
                  <TodoItem
                    todoItem={item}
                    deleteTodo={() => this.props.removeTodo(item)}
                  />
                );
              }
            }}
          />
        </ScrollView>*/}
        <InputAccessoryView>
          { this.state.inputVisible &&
            <AddTodo
              textChange={textInput => this.setState({ textInput })}
              addNewTodo={this.addTodo.bind(this)}
              textInput={this.state.textInput}
              ref={(ref) => { this.textInputField = ref; }}
              onSubmitEditing={this.addTodo.bind(this)}
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
  },
  headerTextStyle: {
    fontSize: 20,
    color: '#FCEFEF',
    fontWeight: 'bold',
  },
  headerViewStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    height: 40,
    flexDirection: 'row',
  }
});

function mapStateToProps(state) {
  return {
    todos: state.TodoReducer.todos,
    dateModalVisible: state.ModalReducer.dateModalVisible
  };
}

export default connect(mapStateToProps, { addTodo, removeTodo })(MainTodo);
