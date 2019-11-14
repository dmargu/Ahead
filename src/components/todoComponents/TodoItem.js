import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';
import NotesModal from '../modals/NotesModal';
import DatePickerModal from '../modals/DatePickerModal';
import { toggleItemMenu } from '../../actions/ModalActions';
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
              onPress={() => this.props.toggleItemMenu(todoItem)}
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
          <View style={{ paddingTop: 4 }}>
            {todoItem.remindersToggled && todoItem.date ?
              <ReminderToggleButtons item={todoItem} /> : null
            }
          </View>

          {todoItem.notesModalVisible ?
            <NotesModal item={todoItem} /> : null
          }

          {todoItem.dateModalVisible ?
            <DatePickerModal item={todoItem} /> : null
          }

        </View>
    );
  }
  renderDate() {
    const todoItem = this.props.todoItem;
    if (moment().isSame(todoItem.date, 'day')) {
      return (
        <Text style={styles.dateSubtitle}>
          {moment(todoItem.date).format('h:mm a')}
        </Text>
      );
    } else if (moment().isAfter(todoItem.date, 'day')) {
      return (
        <Text style={styles.overdueSubtitle}>Overdue</Text>
      );
    } else if (moment().add(1, 'day').isSame(todoItem.date, 'day')) {
      return (
        <Text style={styles.dateSubtitle}>
          Tomorrow {moment(todoItem.date).format('h:mm a')}
        </Text>
      );
    } else if (moment().add(7, 'day').isAfter(todoItem.date, 'day')) {
      return (
        <Text style={styles.dateSubtitle}>
          {moment(todoItem.date).format('dddd h:mm a')}
        </Text>
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

export default connect(null, { toggleItemMenu })(TodoItem);
