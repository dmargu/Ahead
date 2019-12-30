import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { connect } from 'react-redux';
import HomeworkItem from './homeworkComponents/HomeworkItem';
import { removeHomework } from '../actions';

class MainAssignmentsList extends Component {
  filterAssignments(c, hw) {
    return hw.filter(item => item.className === c.name);
  }
  render() {
    const classData = [];
    for (let x = 0; x < this.props.classes.length; x++) {
      classData.push({
        title: this.props.classes[x],
        data: this.filterAssignments(this.props.classes[x], this.props.homework)
      });
    }
    const classNames = [];
    for (let x = 0; x < this.props.classes.length; x++) {
      classNames.push(this.props.classes[x].name);
    }
    const noClassAssignments = this.props.homework.filter(item => !classNames.includes(item.className));
    if (noClassAssignments.length !== 0) {
      classData.push({
        title: {
          name: 'No class'
        },
        data: noClassAssignments
      });
    }
    return (
      <View>
        <SectionList
          sections={classData}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={({ section: item }) => {
            return (
              <Text style={styles.textStyle}>{item.title.name}</Text>
            );
          }}
          renderItem={({ item }) => {
            return (
              <HomeworkItem
                homeworkItem={item}
                deleteHomework={() => this.props.removeHomework(item)}
                forClassesList
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
    fontSize: 30,
    color: 'white'
  }
});

function mapStateToProps(state) {
  return {
    classes: state.ClassesReducer.classes,
    homework: state.ClassesReducer.homework
  };
}

export default connect(mapStateToProps, { removeHomework })(MainAssignmentsList);
