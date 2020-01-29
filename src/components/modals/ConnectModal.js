import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import * as Calendar from 'expo-calendar';
import moment from 'moment';
import Modal from 'react-native-modal';
import { Spinner } from '../common/Spinner';
import { addIcalEvents, connectToIcal } from '../../actions';
import { colors, fonts } from '../../styles';

class ConnectModal extends Component {
  constructor() {
    super();
    this.state = {
      syncingToIcal: false
    };
  }
  connectToIcal() {
    if (!this.props.shouldConnectToIcal) {
      Alert.alert(
        /*eslint-disable-next-line */
        'BEFORE YOU CONNECT: go to the calendar app and create a new calendar called \'Ahead\'. It must be typed EXACTLY like that. DO IT BEFORE PRESSING OK!!',
        null,
        [
          { text: 'OK',
            onPress: () => {
              Alert.alert(
                /*eslint-disable-next-line */
              'Are you SURE you created a calendar exactly called \'Ahead\'? DO NOT PRESS YES UNTIL YOU DID IT.',
              null,
              [
                { text: 'Yes',
                  onPress: () => this.syncIcal()
                },
                { text: 'No',
                  style: 'cancel'
                }
              ],
                { cancelable: false }
              );
            }
          }
        ],
          { cancelable: false }
      );
    } else {
      Alert.alert(
        'Aleady connected to iCal. If you\'re having an issue with it please let me know.',
        null,
        [
          { text: 'OK' }
        ],
          { cancelable: false }
      );
    }
  }

  async syncIcal() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      await this.props.addIcalEvents();
      await this.props.connectToIcal();
      //create the calendar and get the id of the calendar (need to save it)
      //get all of the events they already have and put it in the calendar
      const homework = this.props.homework.filter(hw => hw.date);
      const todos = this.props.todos.filter(todo => todo.date);
      /*eslint-disable no-param-reassign*/
      homework.forEach(hw => (hw.text = hw.assignmentName));
      const tests = this.props.tests.filter(test => test.date);
      tests.forEach(test => (test.text = test.testName));
      /*eslint-enable no-param-reassign*/
      const classDates = [];
      /*eslint-disable no-loop-func*/
      this.setState({ syncingToIcal: true });
      for (let x = 0; x < this.props.classes.length; x++) {
        const c = this.props.classes[x];
        c.classDays.map(day => (classDates.push({
          text: c.name,
          date: day.toDate(),
          endDate: moment(day).hour(moment(c.classEndTime).hour()).minute(moment(c.classEndTime).minute())
          .toDate()
        })));
      }
      /*eslint-enable no-loop-func*/
      const allItems = homework.concat(todos, tests, classDates);
      //for loop to put all current events in the calendar
      for (let x = 0; x < allItems.length; x++) {
        await Calendar.createEventAsync(this.props.localiCalID, {
          title: allItems[x].text,
          startDate: allItems[x].date,
          endDate: allItems[x].endDate ? allItems[x].endDate : allItems[x].date,
          notes: allItems[x].notes ? allItems[x].notes : ''
        });
      }
      this.props.closeHandle();
      this.setState({ syncingToIcal: false });

      //do it in the action and pass it into function in action as props, pass it into action as props
      //then need conditional every time they add or delete something if the shouldConnectToIcal prop
      //is true then it needs to add or delete it from the iCal with the ahead calendarID that is saved
    } else {
      Alert.alert(
        'Cannot connect to iCal without permission.',
        null,
        [
          { text: 'OK' }
        ],
          { cancelable: false }
      );
    }
  }

  gCalAlert() {
    return (
      Alert.alert(
        /*eslint-disable-next-line */
        'To sync to gCal, first follow the directions for syncing to iCal. Then make the iCal calendar public and get the shareable link. From there add it into google calendar by adding a calendar through a URL.',
        null,
        [
          { text: 'OK' }
        ],
          { cancelable: false }
      )
    );
  }
  render() {
    return (
      <Modal
        animationIn='fadeIn'
        animationOut='fadeOut'
        backdropTransitionOutTiming={0}
        hasBackDrop
        backdropOpacity={0.9}
        transparent
        isVisible={this.props.isVisible}
        onBackdropPress={() => this.props.closeHandle()}
      >
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 40 }}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.connectToIcal.bind(this)}
                underlayColor={null}
              >
                {!this.state.syncingToIcal && <Text style={styles.text}>Connect To iCal</Text>}
                {this.state.syncingToIcal && <Spinner size='large' />}
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 40 }}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.gCalAlert.bind(this)}
              >
                <Text style={styles.text}>Connect To gCal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.mainDark,
    backgroundColor: colors.darkGrey
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    borderRadius: 30,
    backgroundColor: colors.mainRed,
  },
  text: {
    color: colors.white,
    fontSize: fonts.buttonText,
    fontFamily: fonts.fontFamily
  }
});

function mapStateToProps(state) {
  return {
    shouldConnectToIcal: state.StorageReducer.shouldConnectToIcal,
    localiCalID: state.StorageReducer.localiCalID,
    classes: state.ClassesReducer.classes,
    homework: state.ClassesReducer.homework,
    todos: state.TodoReducer.todos,
    tests: state.ClassesReducer.tests,
  };
}

export default connect(mapStateToProps, { addIcalEvents, connectToIcal })(ConnectModal);
