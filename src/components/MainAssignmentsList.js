import React, { Component } from 'react';
import { View, SectionList, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import HomeworkItem from './homeworkComponents/HomeworkItem';
import TestItem from './testComponents/TestItem';
import ClassTouchableHeader from './classComponents/ClassTouchableHeader';
import { removeHomework, removeTest } from '../actions';
import { colors, fonts } from '../styles';

class MainAssignmentsList extends Component {
  constructor() {
    super();
    this.state = {
      classModalVisible: false
    };
  }
  filterAssignments(c, hw) {
    return hw.filter(item => item.className === c.name);
  }
  render() {
    const assignmentData = this.props.homework.concat(this.props.tests);
    const classData = [];
    for (let x = 0; x < this.props.classes.length; x++) {
      classData.push({
        title: this.props.classes[x],
        data: this.filterAssignments(this.props.classes[x], assignmentData)
      });
    }
    const classNames = [];
    for (let x = 0; x < this.props.classes.length; x++) {
      classNames.push(this.props.classes[x].name);
    }
    const noClassAssignments = assignmentData.filter(item => !classNames.includes(item.className));
    if (noClassAssignments.length !== 0) {
      classData.push({
        title: {
          noClassTitle: 'No class' //this doesn't really do anything but it works
        },
        data: noClassAssignments
      });
    }
    return (
      <View>
        <SectionList
          sections={classData}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: item }) => {
            if (item.title.name) {
              return (
                <ClassTouchableHeader item={item.title} />
              );
            }
            return (
              <Text style={[styles.textStyle, { padding: 5 }]}>No Class</Text>
            );
          }}
          renderItem={({ item }) => {
            if (item.assignmentName) {
              return (
                <HomeworkItem
                  homeworkItem={item}
                  deleteHomework={() => this.props.removeHomework(item)}
                  forClassesList
                  todayListItem
                />
              );
            }
            return (
              <TestItem
                testItem={item}
                deleteTest={() => this.props.removeTest(item)}
                forClassesList
                todayListItem
              />
            );
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
  }
});

function mapStateToProps(state) {
  return {
    classes: state.ClassesReducer.classes,
    homework: state.ClassesReducer.homework,
    tests: state.ClassesReducer.tests
  };
}

export default connect(mapStateToProps, { removeHomework, removeTest })(MainAssignmentsList);
