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

  todayListItems() {
    return this.props.todos.filter(item => moment().isSame(item.date, 'day'));
  }

  tomorrowListItems() {
    return this.props.todos.filter(item => moment().add(1, 'day').isSame(item.date, 'day'));
  }

  upcomingListItems() {
    return this.props.todos.filter(item => moment().add(1, 'day').isBefore(item.date, 'day'));
  }

  sometimeListItems() {
    return this.props.todos.filter(
      item => moment().isAfter(item.date, 'day') || item.date === null
    );
  }

  render() {
    const todayItems = this.todayListItems.bind(this)();
    const tomorrowItems = this.tomorrowListItems.bind(this)();
    const upcomingItems = this.upcomingListItems.bind(this)();
    const sometimeItems = this.sometimeListItems.bind(this)();
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView>
          <View style={styles.headerViewStyle}>
            <Text style={styles.headerTextStyle}>Today</Text>
          </View>

          <FlatList
            data={_.sortBy(todayItems, (item) => {
              return item.date;
            })}
            extraData={this.todayItems}
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

          <View style={styles.headerViewStyle}>
            <Text style={styles.headerTextStyle}>Tomorrow</Text>
          </View>

          <FlatList
            data={_.sortBy(tomorrowItems, (item) => {
              return item.date;
            })}
            extraData={tomorrowItems}
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

          <View style={styles.headerViewStyle}>
            <Text style={styles.headerTextStyle}>Upcoming</Text>
          </View>

          <FlatList
            data={_.sortBy(upcomingItems, (item) => {
              return item.date;
            })}
            extraData={upcomingItems}
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

          <View style={styles.headerViewStyle}>
            <Text style={styles.headerTextStyle}>Sometime</Text>
          </View>

          <FlatList
            data={_.sortBy(sometimeItems, (item) => {
              return item.date;
            })}
            extraData={sometimeItems}
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
        </ScrollView>
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
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  headerTextStyle: {
    fontSize: 20,
    color: '#FCEFEF',
    fontWeight: 'bold'
  },
  headerViewStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    height: 40,
    flexDirection: 'row',
    borderBottomColor: '#6c7a86',
    borderBottomWidth: 0.25
  }
});

function mapStateToProps(state) {
  return {
    todos: state.TodoReducer.todos
  };
}

export default connect(mapStateToProps, { addTodo, removeTodo })(MainTodo);
