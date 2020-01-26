import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import shortid from 'shortid';
import ClassItem from './classComponents/ClassItem';
import TodoItem from './todoComponents/TodoItem';
import HomeworkItem from './homeworkComponents/HomeworkItem';
import TestItem from './testComponents/TestItem';
import StudyItem from './testComponents/StudyItem';
import EmptyListComponent from './EmptyListComponent';
import { colors, fonts } from '../styles';
import { removeTest, removeTodo, removeHomework, removeClassDay, toggleStudyReminder } from '../actions';

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
      const isClassToday = this.props.classes[x].remainingClassDays.find(
        c => (moment(c).isSame(new Date(), 'day'))
      );
      if (isClassToday) {
        todayClasses.push(this.props.classes[x]);
      }
    }
    const todayTestStudy = [];
    for (let x = 0; x < this.props.tests.length; x++) {
      const test = this.props.tests[x];
      const studyObject = {
        test,
        id: shortid.generate()
      };
      if (moment(test.date).isBefore(moment(new Date()).add(7, 'days'))) {
        if (moment(test.date).isSame(moment(new Date()).add(1, 'days'), 'day') && test.oneDayStudy) {
          studyObject.studyName = `${test.testName} is tomorrow. Study!!!`;
          studyObject.type = 'oneDay';
          todayTestStudy.push(studyObject);
        } else if (moment(test.date).isSame(moment(new Date()).add(2, 'days'), 'day') && test.twoDayStudy) {
          studyObject.studyName = `${test.testName} in two days. Study!!!`;
          studyObject.type = 'twoDay';
          todayTestStudy.push(studyObject);
        } else if (moment(test.date).isSame(moment(new Date()).add(3, 'days'), 'day') && test.threeDayStudy) {
          studyObject.studyName = `${test.testName} in three days. Study!!!`;
          studyObject.type = 'threeDay';
          todayTestStudy.push(studyObject);
        } else if (moment(test.date).isSame(moment(new Date()).add(4, 'days'), 'day') && test.fourDayStudy) {
          studyObject.studyName = `${test.testName} in four days. Study!!!`;
          studyObject.type = 'fourDay';
          todayTestStudy.push(studyObject);
        } else if (moment(test.date).isSame(moment(new Date()).add(5, 'days'), 'day') && test.fiveDayStudy) {
          studyObject.studyName = `${test.testName} in five days. Study!!!`;
          studyObject.type = 'fiveDay';
          todayTestStudy.push(studyObject);
        } else if (moment(test.date).isSame(moment(new Date()).add(6, 'days'), 'day') && test.sixDayStudy) {
          studyObject.studyName = `${test.testName} in six days. Study!!!`;
          studyObject.type = 'sixDay';
          todayTestStudy.push(studyObject);
        }
      }
    }
    let todayData = todayTodos.concat(todayClasses, todayTests, todayHomework, todayTestStudy);
    todayData = _.orderBy(todayData, (item) => item.date, ['desc']);

    const todayiCal = [];
    this.props.iCalEvents.map(event => ((moment(event.date).isSame(new Date(), 'day'))
    ? todayiCal.push(event) : null));
    return (
      <View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Today</Text>
        </View>
        <FlatList
          data={todayData}
          extraData={todayData}
          keyExtractor={item => item.id}
          ListEmptyComponent={<EmptyListComponent text={'Nothing for now! Do something memorable.'} />}
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
            } else if (item.studyName) {
              return (
                <StudyItem
                  item={item}
                  deleteStudy={() => this.props.toggleStudyReminder(item)} //just make the study prop false
                />
              );
            }
          }}
        />
        {/*todayiCal.length !== 0 &&
          <View>
            <Text>iCal Events</Text>
            <FlatList
              data={todayiCal}
              extraData={todayiCal}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Text>{item.text}</Text>
                  </View>
                );
              }}
            />
          </View>
        */}
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
    tests: state.ClassesReducer.tests,
    iCalEvents: state.StorageReducer.iCalEvents
  };
}
export default connect(mapStateToProps, {
  removeTest,
  removeTodo,
  removeHomework,
  removeClassDay,
  toggleStudyReminder
})(TodayIncludes);
