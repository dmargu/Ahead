import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import ClassItem from './classComponents/ClassItem';
import TodoItem from './todoComponents/TodoItem';
import HomeworkItem from './homeworkComponents/HomeworkItem';
import TestItem from './testComponents/TestItem';
import { colors, fonts } from '../styles';
import { removeTest, removeTodo, removeHomework, removeClassDay } from '../actions';

class TodayIncludes extends Component {
  render() {
    const todayTodos = [];
    this.props.todos.map(todo => ((moment(todo.date).isSame(new Date(), 'day'))
    ? todayTodos.push(todo) : null));

    const todayHomework = [];
    this.props.homework.map(hw => ((moment(hw.date).isSame(new Date(), 'day'))
    ? todayHomework.push(hw) : null));

    const todayTests = [];
    this.props.tests.map(test => ((moment(test.date).isSame(new Date(), 'day'))
    ? todayTests.push(test) : null));

    const todayClasses = [];
    for (let x = 0; x < this.props.classes.length; x++) {
      console.log(this.props.classes[x].remainingClassDays);
      const isClassToday = this.props.classes[x].remainingClassDays.find(
        c => (moment(c).isSame(new Date(), 'day'))
      );
      if (isClassToday) {
        todayClasses.push(this.props.classes[x]);
      }
    }
    let todayData = todayTodos.concat(todayClasses, todayTests, todayHomework);
    todayData = _.orderBy(todayData, (item) => item.date, ['desc']);
    return (
      <View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Today</Text>
        </View>
        <FlatList
          data={todayData}
          extraData={todayData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            if (item.name) { //each attribute is unique to the type (ex. only class has item.name)
              return (
                <ClassItem
                  classItem={item}
                  removeClassDay={() => this.props.removeClassDay(item)}
                  todayListItem
                />
              );
            } else if (item.assignmentName) {
              return (
                <HomeworkItem
                  homeworkItem={item}
                  deleteHomework={() => this.props.removeHomework(item)}
                  todayListItem
                />
              );
            } else if (item.text) {
              return (
                <TodoItem
                  todoItem={item}
                  deleteTodo={() => this.props.removeTodo(item)}
                  todayListItem
                />
              );
            } else if (item.testName) {
              return (
                <TestItem
                  testItem={item}
                  deleteTest={() => this.props.removeTest(item)}
                  todayListItem
                />
              );
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: fonts.headerText,
    color: colors.mainLightText,
    fontFamily: fonts.fontFamily
  },
  viewStyle: {
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
  }
});

function mapStateToProps(state) {
  return {
    classes: state.ClassesReducer.classes,
    homework: state.ClassesReducer.homework,
    todos: state.TodoReducer.todos,
    tests: state.ClassesReducer.tests
  };
}
export default connect(mapStateToProps, {
  removeTest,
  removeTodo,
  removeHomework,
  removeClassDay
})(TodayIncludes);
