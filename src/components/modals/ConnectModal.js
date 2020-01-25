import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import * as Calendar from 'expo-calendar';
import moment from 'moment';
import { colors, fonts } from '../../styles';

class ConnectModal extends Component {
  async connectToIcal() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        const calendarIds = [];
        for (let x = 0; x < calendars.length; x++) {
          calendarIds.push(calendars[x].source.id);
        }
        const events = await Calendar.getEventsAsync(
          calendarIds, moment(new Date()).subtract(1, 'months').toDate()
          , moment(new Date()).add(1, 'years').toDate());
        console.log(events);
      }
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
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.connectToIcal.bind(this)}
                underlayColor={null}
              >
                <Text style={styles.text}>Connect To iCal</Text>
              </TouchableOpacity>

              {/*<TouchableOpacity
                style={styles.buttonContainer}
                //onPress={this.onButtonPress.bind(this)}
              >
                <Text style={styles.text}>Connect To gCal</Text>
              </TouchableOpacity>*/}
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
    backgroundColor: colors.mainRed
  },
  text: {
    color: colors.white,
    fontSize: fonts.buttonText,
    fontFamily: fonts.fontFamily
  }
});

export default ConnectModal;
