import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import NotesModal from '../modals/NotesModal';
import DatePickerModal from '../modals/DatePickerModal';
import MainItemModal from '../modals/MainItemModal';
import ReminderToggleButtons from '../ReminderToggleButtons';
import HomeworkSwipeRow from './HomeworkItemSwipe';
import { toggleItemModal } from '../../actions';

class HomeworkItem extends Component {
  render() {
    const homeworkItem = this.props.homeworkItem;

    return (
        <View>
          <HomeworkSwipeRow
            item={homeworkItem}
            completeItem={this.props.deleteHomework}
          >
            <TouchableHighlight
              underlayColor={null}
              onPress={() => this.props.toggleItemModal(homeworkItem)}
            >
              <ListItem
                containerStyle={styles.homeworkItem}
                contentContainerStyle={styles.contentStyle}
                title={homeworkItem.text}
                titleStyle={{ color: '#FCEFEF', fontSize: 16 }}
                rightElement={homeworkItem.date ? this.renderDate.bind(this)() : null}
              />
            </TouchableHighlight>
          </HomeworkSwipeRow>
          <View style={{ paddingTop: 4 }}>
            {homeworkItem.remindersToggled && homeworkItem.date ?
              <ReminderToggleButtons item={homeworkItem} /> : null
            }
          </View>

          {homeworkItem.notesModalVisible ?
            <NotesModal item={homeworkItem} /> : null
          }

          {homeworkItem.dateModalVisible ?
            <DatePickerModal item={homeworkItem} /> : null
          }

          {homeworkItem.itemModalVisible ?
            <MainItemModal item={homeworkItem} /> : null
          }

        </View>
    );
  }
  renderDate() {
    const homeworkItem = this.props.homeworkItem;
    if (moment().isSame(homeworkItem.date, 'day')) {
      return (
        <Text style={styles.dateSubtitle}>
          {moment(homeworkItem.date).format('h:mm a')}
        </Text>
      );
    } else if (moment().isAfter(homeworkItem.date, 'day')) {
      return (
        <Text style={styles.overdueSubtitle}>Overdue</Text>
      );
    } else if (moment().add(1, 'day').isSame(homeworkItem.date, 'day')) {
      return (
        <Text style={styles.dateSubtitle}>
          Tomorrow {moment(homeworkItem.date).format('h:mm a')}
        </Text>
      );
    } else if (moment().add(7, 'day').isAfter(homeworkItem.date, 'day')) {
      return (
        <Text style={styles.dateSubtitle}>
          {moment(homeworkItem.date).format('dddd h:mm a')}
        </Text>
      );
    }
    return (
      <Text style={styles.dateSubtitle}>
        {moment(homeworkItem.date).format('MMM DD h:mm a')}
      </Text>
    );
  }
}


const styles = StyleSheet.create({
  homeworkItem: {
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

export default connect(null, { toggleItemModal })(HomeworkItem);
