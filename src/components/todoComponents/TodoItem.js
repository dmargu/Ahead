import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import NotesModal from '../modals/NotesModal';
import DatePickerModal from '../modals/DatePickerModal';
import MainItemModal from '../modals/MainItemModal';
import ReminderToggleButtons from '../ReminderToggleButtons';
import ItemSwipeRow from './TodoItemSwipe';
import { todoIcon } from '../../../assets/InAppIcons';
import { toggleItemModal } from '../../actions';
import { colors } from '../../styles';

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
              underlayColor={null}
              onPress={() => this.props.toggleItemModal(todoItem)}
            >
              <ListItem
                containerStyle={styles.todoItem}
                contentContainerStyle={styles.contentStyle}
                title={
                  <Text style={styles.textStyle} ellipsizeMode='tail' numberOfLines={1}>
                    {todoItem.text}
                  </Text>
                }
                leftAvatar={this.props.todayListItem ? todoIcon : null}
                subtitle={todoItem.date ? this.renderDate.bind(this)() : null}
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

          {todoItem.itemModalVisible ?
            <MainItemModal item={todoItem} /> : null
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
    backgroundColor: '#0c1419'
  },
  container: {
    width: '100%',
  },
  contentStyle: {
    flex: 1
  },
  dateSubtitle: {
    color: colors.lightGrey,
    fontSize: 16
  },
  overdueSubtitle: {
    color: colors.mainRed,
    fontSize: 16,
    fontWeight: 'bold'
  },
  textStyle: {
    color: colors.white,
    fontSize: 16
  }
});

export default connect(null, { toggleItemModal })(TodoItem);
