import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';
import NotesModal from '../modals/NotesModal';
import DatePickerModal from '../modals/DatePickerModal';
import { toggleItemMenu } from '../../actions/ModalActions';
import ItemMenuBar from '../ItemMenuBar';
import ReminderToggleButtons from '../ReminderToggleButtons';
import ItemSwipeRow from '../ItemSwipe';

class TodoItem extends Component {
  render() {
    const todoItem = this.props.todoItem;

    return (
        <View>
          <ItemSwipeRow
            item={todoItem}
            completeItem={this.props.deleteTodo}
          >
            <TouchableHighlight
              onPress={() => this.props.toggleItemMenu(todoItem.id)}
              underlayColor={null}
            >
              <ListItem
                containerStyle={styles.todoItem}
                contentContainerStyle={styles.contentStyle}
                title={todoItem.text}
                titleStyle={{ color: '#FCEFEF', fontSize: 16 }}
                rightElement={todoItem.date ? this.renderDate.bind(this)() : null}
              />
            </TouchableHighlight>
          </ItemSwipeRow>
          {todoItem.itemMenuToggled ?
            <ItemMenuBar item={todoItem} /> : null
          }
          {this.props.reminderToggleActive && todoItem.date ?
            <ReminderToggleButtons item={todoItem} /> : null
          }
        <NotesModal item={todoItem} />
        <DatePickerModal item={todoItem} />
      </View>
    );
  }
  renderDate() {
    const todoItem = this.props.todoItem;
    if (moment().isSame(todoItem.date, 'day') || moment().add(1, 'day').isSame(todoItem.date, 'day')) {
      return (
        <Text style={styles.dateSubtitle}>
          {moment(todoItem.date).format('h:mm a')}
        </Text>
      );
    } else if (moment().isAfter(todoItem.date, 'day')) {
      return (
        <Text style={styles.overdueSubtitle}>Overdue</Text>
      );
    }
    return (
      <Text style={styles.dateSubtitle}>
        {moment(todoItem.date).format('MMM DD h:mm a')}
      </Text>
    );
  }
}


const styles = StyleSheet.create({
  todoItem: {
    paddingLeft: 15,
    backgroundColor: '#28313b'
  },
  container: {
    width: '100%',
  },
  contentStyle: {
    flex: 1
  },
  dateSubtitle: {
    color: '#cdd2c9',
    fontSize: 16
  },
  overdueSubtitle: {
    color: '#db5461',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

function mapStateToProps(state) {
  return {
    reminderToggleActive: state.RemindersReducer.reminderToggleActive,
  };
}

export default connect(mapStateToProps, { toggleItemMenu })(TodoItem);
