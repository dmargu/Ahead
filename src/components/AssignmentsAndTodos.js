import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { connect } from 'react-redux';
import HomeworkItem from './homeworkComponents/HomeworkItem';
import TodoItem from './todoComponents/TodoItem';
import { removeHomework, removeTodo } from '../actions';

class AssignmentsAndTodosList extends Component {
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
          renderSectionHeader={({ section: { title } }) => {
            return (
              <Text style={styles.textStyle}>{title}</Text>
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
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
});

function mapStateToProps(state) {
  return {
    homework: state.ClassesReducer.homework,
    todos: state.TodoReducer.todos
  };
}

export default connect(mapStateToProps, { removeHomework, removeTodo })(AssignmentsAndTodosList);
