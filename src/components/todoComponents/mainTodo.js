import React, { Component } from 'react';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  //ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
//import moment from 'moment';
import TodoItem from './TodoItem';
import { addTodo, removeTodo } from '../../actions';

const HEIGHT = Dimensions.get('window').height;

class MainTodo extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    {/*<ScrollView>*/}
          <FlatList
            data={_.sortBy(this.props.todos, (item) => { //not working correctly
              return item.date;
            })}
            extraData={this.props.todos}
            keyExtractor={item => item.id}
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
  };
}

export default connect(mapStateToProps, { addTodo, removeTodo })(MainTodo);
