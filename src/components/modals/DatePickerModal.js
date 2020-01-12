import React, { Component } from 'react';
import { View, StyleSheet, Modal, Platform, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { toggleDateModal, clearDate, cancelAllNotifications } from '../../actions';
import IosDatePicker from '../common/IosDatePicker';
import AndroidDatePicker from '../common/AndroidDatePicker';
import ReminderToggleButtons from '../ReminderToggleButtons';
import { colors, fonts } from '../../styles';

class DatePickerModal extends Component {
  onClearDatePress() {
    this.props.cancelAllNotifications(this.props.item.id, this.props.notificationIDs);
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
                  style={[styles.clearDateButton, { backgroundColor: item.date ? colors.mainRed : null }]}
                  onPress={this.onClearDatePress.bind(this)}
                >
                  <Text style={[styles.clearDateText, { color: item.date ? colors.white : colors.mainRed }]}>
                    Clear Date
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ padding: 5 }}>
                <Feather
                  name="x-square"
                  size={35}
                  color={colors.lightGrey}
                  onPress={() => this.props.toggleDateModal(item)}
                />
              </View>
            </View>
            <View style={{ padding: 5 }}>
              {Platform.OS === 'ios' ?
                <IosDatePicker item={item} /> : <AndroidDatePicker />
              }
            </View>
            { item.date && <View style={styles.containerStyle}>
              <Text style={styles.remindersText}>Reminders</Text>
              <ReminderToggleButtons item={item} />
            </View>}
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
    borderColor: colors.mainDark,
    backgroundColor: colors.darkGrey
  },
  remindersText: {
    fontSize: fonts.headerText,
    color: colors.mainRed,
    fontFamily: fonts.fontFamily,
    fontWeight: 'bold',
    paddingBottom: 5
  },
  clearDateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colors.mainRed
  },
  clearDateText: {
    padding: 2,
    fontSize: fonts.buttonText,
    fontFamily: fonts.fontFamily
  }
});

function mapStateToProps(state) {
  return {
    notificationIDs: state.StorageReducer.notificationIDs
  };
}

export default connect(mapStateToProps, {
  toggleDateModal,
  clearDate,
  cancelAllNotifications
})(DatePickerModal);
