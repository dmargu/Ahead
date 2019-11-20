import React, { Component } from 'react';
import { View, StyleSheet, Modal, Platform, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { toggleDateModal, clearDate, cancelAllNotifications } from '../../actions';
import IosDatePicker from '../common/IosDatePicker';
import AndroidDatePicker from '../common/AndroidDatePicker';
import ReminderToggleButtons from '../ReminderToggleButtons';

class DatePickerModal extends Component {
  onClearDatePress() {
    //this.props.cancelAllNotifications(this.props.item);
    this.props.clearDate(this.props.item);
  }
  render() {
    const item = this.props.item;
    return (
      <Modal transparent animationType='fade'>
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <View style={{ padding: 10 }}>
                <TouchableOpacity
                  style={[styles.clearDateButton, { backgroundColor: item.date ? '#db5461' : null }]}
                  onPress={this.onClearDatePress.bind(this)}
                >
                  <Text style={[styles.clearDateText, { color: item.date ? '#fcefef' : '#db5461' }]}>
                    Clear Date
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ padding: 5 }}>
                <Feather
                  name="x-square"
                  size={35}
                  color={'#db5461'}
                  onPress={() => this.props.toggleDateModal(item)}
                />
              </View>
            </View>
            <View style={{ padding: 5 }}>
              {Platform.OS === 'ios' ?
                <IosDatePicker item={item} /> : <AndroidDatePicker />
              }
            </View>
            <View style={styles.containerStyle}>
              <Text style={styles.remindersText}>Reminders</Text>
              <ReminderToggleButtons item={item} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: 360,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#28313b',
    backgroundColor: '#555B6E'
  },
  remindersText: {
    fontSize: 20,
    color: '#db5461',
    fontWeight: 'bold',
    paddingBottom: 5
  },
  clearDateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#db5461'
  },
  clearDateText: {
    padding: 2,
    fontSize: 18
  }
});

export default connect(null, { toggleDateModal, clearDate, cancelAllNotifications })(DatePickerModal);
