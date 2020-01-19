import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { connect } from 'react-redux';
import HomeworkItem from './homeworkComponents/HomeworkItem';
import TodoItem from './todoComponents/TodoItem';
import EmptyListComponent from './EmptyListComponent';
import { removeHomework, removeTodo } from '../actions';
import { colors, fonts } from '../styles';

class AssignmentsAndTodosList extends Component {
  renderNoContent = (section) => {
   if (section.data.length === 0 && section.title === 'Homework') {
      return <EmptyListComponent text='No assignments to add? Dont fall behind.' />;
   } else if (section.data.length === 0 && section.title === 'To-Do\'s') {
      return <EmptyListComponent text='Nothing to do! Congrats, what else you got?' />;
   }
   return null;
  }
  render() {
    const data = [
      {
        title: 'To-Do\'s',
        data: this.props.todos
      },
      {
        title: 'Homework',
        data: this.props.homework
      }
    ];
    return (
      <View>
        <SectionList
          sections={data}
          keyExtractor={(item) => item.id}
          renderSectionFooter={({ section }) => this.renderNoContent(section)}
          renderSectionHeader={({ section: { title } }) => {
            return (
              <View style={{ paddingLeft: 5 }}>
                <Text style={styles.textStyle}>{title}</Text>
              </View>
            );
          }}
          renderItem={({ item }) => {
            if (item.assignmentName) { //only homework has assignment name prop
              return (
                <HomeworkItem
                  homeworkItem={item}
                  deleteHomework={() => this.props.removeHomework(item)}
                />
              );
            }
            return (
              <TodoItem
                todoItem={item}
                deleteTodo={() => this.props.removeTodo(item)}
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
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily
  }
});

function mapStateToProps(state) {
  return {
    homework: state.ClassesReducer.homework,
    todos: state.TodoReducer.todos
  };
}

export default connect(mapStateToProps, { removeHomework, removeTodo })(AssignmentsAndTodosList);
