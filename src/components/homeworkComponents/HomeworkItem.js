import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import NotesModal from '../modals/NotesModal';
import DatePickerModal from '../modals/DatePickerModal';
import MainHomeworkModal from './MainHomeworkModal';
import HomeworkSwipeRow from './HomeworkItemSwipe';
import { homeworkIcon } from '../../../assets/InAppIcons';
import { toggleItemModal } from '../../actions';

class HomeworkItem extends Component {
  constructor() {
    super();
    this.state = {
      homeworkModalVisible: false
    };
  }
  render() {
    console.log(this.state.homeworkModalVisible);
    const homeworkItem = this.props.homeworkItem;
    return (
        <View>
          <HomeworkSwipeRow
            item={homeworkItem}
            completeItem={this.props.deleteHomework}
          >
            <TouchableHighlight
              underlayColor={null}
              onPress={() => this.setState({ homeworkModalVisible: true })}
            >
              <ListItem
                containerStyle={styles.homeworkItem}
                contentContainerStyle={styles.contentStyle}
                title={
                  <Text style={{ color: '#FCEFEF', fontSize: 16 }} ellipsizeMode='tail' numberOfLines={1}>
                    {homeworkItem.assignmentName}
                  </Text>
                }
                leftAvatar={this.props.todayListItem ? homeworkIcon : null}
                subtitle={homeworkItem.dueDate ? this.renderDate.bind(this)() : null}
                rightTitle={homeworkItem.className ? homeworkItem.className : null}
                rightTitleStyle={styles.dateSubtitle}
              />
            </TouchableHighlight>
          </HomeworkSwipeRow>

          <MainHomeworkModal
            item={homeworkItem}
            isVisible={this.state.homeworkModalVisible}
            closeHandle={() => this.setState({ homeworkModalVisible: false })}
          />
          {/*<View style={{ paddingTop: 4 }}>
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
          }*/}

        </View>
    );
  }
  renderDate() {
    const homeworkItem = this.props.homeworkItem;
    if (moment().isSame(homeworkItem.dueDate, 'day')) {
      return (
        <Text style={styles.dateSubtitle}>
          due {moment(homeworkItem.dueDate).format('h:mm a')}
        </Text>
      );
    } else if (moment().isAfter(homeworkItem.dueDate, 'day')) {
      return (
        <Text style={styles.overdueSubtitle}>Overdue</Text>
      );
    } else if (moment().add(1, 'day').isSame(homeworkItem.dueDate, 'day')) {
      return (
        <Text style={styles.dateSubtitle}>
          due Tomorrow {moment(homeworkItem.dueDate).format('h:mm a')}
        </Text>
      );
    } else if (moment().add(7, 'day').isAfter(homeworkItem.dueDate, 'day')) {
      return (
        <Text style={styles.dateSubtitle}>
          due {moment(homeworkItem.dueDate).format('dddd h:mm a')}
        </Text>
      );
    }
    return (
      <Text style={styles.dateSubtitle}>
        due {moment(homeworkItem.dueDate).format('MMM DD h:mm a')}
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
