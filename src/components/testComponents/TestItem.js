import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
//import NotesModal from '../modals/NotesModal';
//import DatePickerModal from '../modals/DatePickerModal';
import MainTestModal from './MainTestModal';
import HomeworkSwipeRow from '../homeworkComponents/HomeworkItemSwipe';
import { testIcon } from '../../../assets/InAppIcons';

class HomeworkItem extends Component {
  constructor() {
    super();
    this.state = {
      homeworkModalVisible: false
    };
  }
  render() {
    const testItem = this.props.testItem;
    return (
        <View>
          <HomeworkSwipeRow
            item={testItem}
            completeItem={this.props.deleteTest}
          >
            <TouchableHighlight
              underlayColor={null}
              onPress={() => this.setState({ testModalVisible: true })}
            >
              <ListItem
                containerStyle={[styles.testItem,
                  { backgroundColor: this.props.changeColor ? this.props.changeColor : '#28313b' }
                ]}
                contentContainerStyle={styles.contentStyle}
                title={
                  <Text style={{ color: '#FCEFEF', fontSize: 16 }} ellipsizeMode='tail' numberOfLines={1}>
                    {testItem.testName}
                  </Text>
                }
                leftAvatar={this.props.todayListItem ? testIcon : null}
                subtitle={testItem.date ? this.renderDate.bind(this)() : null}
                rightTitle={
                  !this.props.forClassesList && testItem.className ? testItem.className : null
                }
                rightTitleStyle={styles.dateSubtitle}
              />
            </TouchableHighlight>
          </HomeworkSwipeRow>

          {/*<MainTestModal
            item={testItem}
            isVisible={this.state.testModalVisible}
            closeHandle={() => this.setState({ testModalVisible: false })}
          />*/}
          {/*<View style={{ paddingTop: 4 }}>
            {testItem.remindersToggled && testItem.date ?
              <ReminderToggleButtons item={testItem} /> : null
            }
          </View>

          {testItem.notesModalVisible ?
            <NotesModal item={testItem} /> : null
          }

          {testItem.dateModalVisible ?
            <DatePickerModal item={testItem} /> : null
          }*/}

        </View>
    );
  }
  renderDate() {
    const date = this.props.testItem.date;
    if (moment().isSame(date, 'day')) {
      return (
        <Text style={styles.dateSubtitle}>
          {moment(date).format('h:mm a')}
        </Text>
      );
    } else if (moment().isAfter(date, 'day')) {
      return (
        <Text style={styles.overdueSubtitle}>Already passed. Need to change the date?</Text>
      );
    } else if (moment().add(1, 'day').isSame(date, 'day')) {
      return (
        <Text style={styles.dateSubtitle}>
          Tomorrow {moment(date).format('h:mm a')}
        </Text>
      );
    } else if (moment().add(7, 'day').isAfter(date, 'day')) {
      return (
        <Text style={styles.dateSubtitle}>
          {moment(date).format('dddd h:mm a')}
        </Text>
      );
    }
    return (
      <Text style={styles.dateSubtitle}>
        {moment(date).format('MMM DD h:mm a')}
      </Text>
    );
  }
}


const styles = StyleSheet.create({
  testItem: {
    paddingLeft: 15,
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

export default HomeworkItem;
