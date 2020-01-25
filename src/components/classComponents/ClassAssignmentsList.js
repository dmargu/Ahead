import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import HomeworkItem from '../homeworkComponents/HomeworkItem';
import TestItem from '../testComponents/TestItem';
import { removeHomework, removeTest } from '../../actions';
import { colors, fonts } from '../../styles';

class ClassAssignmentsList extends Component {
  render() {
    const assignmentData = this.props.homework.concat(this.props.tests);
    const classData = assignmentData.filter(hw => hw.className === this.props.item.name);
    if (classData.length !== 0) {
      return (
        <View style={{ maxHeight: 250 }}>
          <View style={{ paddingTop: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.normalText}>Assignments</Text>
          </View>
          <View>
            <FlatList
              data={_.sortBy(classData, (hw) => {
                return hw.date;
              })}
              extraData={assignmentData}
              keyExtractor={hw => hw.id}
              renderItem={({ item }) => {
                if (item.assignmentName) {
                  return (
                    <HomeworkItem
                      homeworkItem={item}
                      deleteHomework={() => this.props.removeHomework(item)}
                      forClassesList
                      changeColor={colors.darkGrey}
                    />
                  );
                }
                return (
                  <TestItem
                    testItem={item}
                    deleteTest={() => this.props.removeTest(item)}
                    forClassesList
                    changeColor={colors.darkGrey}
                  />
                );
              }}
            />
          </View>
        </View>
      );
    }
    return (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  normalText: {
    fontSize: fonts.headerText,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily
  },
  listBorder: {
    //borderTopWidth: 0.25,
    borderBottomWidth: 0.25,
    borderColor: colors.white,
  }
});

function mapStateToProps(state) {
  return {
    homework: state.ClassesReducer.homework,
    tests: state.ClassesReducer.tests
  };
}

export default connect(mapStateToProps, { removeHomework, removeTest })(ClassAssignmentsList);
