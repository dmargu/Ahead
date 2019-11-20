import React, { Component } from 'react';
import { View, StyleSheet, Modal, TextInput, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { toggleNotesModal, notesChanged, cancelAllNotifications } from '../../actions';
//import { scheduleNotification } from '../../functions/ScheduleNotification';

class NotesModal extends Component {
  /*componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  keyboardDidHide() {
    this.props.cancelAllNotifications(this.props.item);
    if (this.props.item.startReminder) {
      scheduleNotification.startReminder(this.props.item);
    }
    if (this.props.item.tenMinReminder) {
      scheduleNotification.tenMinReminder(this.props.item);
    }
    if (this.props.item.thirtyMinReminder) {
      scheduleNotification.thirtyMinReminder(this.props.item);
    }
    if (this.props.oneHourReminder) {
      scheduleNotification.oneHourReminder(this.props.item);
    }
    if (this.props.oneDayReminder) {
      scheduleNotification.oneDayReminder(this.props.item);
    }
  }*/

  onNotesChange(text) {
    this.props.notesChanged(text, this.props.item);
  }
  render() {
    const item = this.props.item;
    return (
      <Modal transparent animationType='fade'>
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
              <View style={{ padding: 5 }}>
                <Feather
                  name="x-square"
                  size={35}
                  color={'#db5461'}
                  onPress={() => this.props.toggleNotesModal(item)}
                />
              </View>
            </View>
            <View style={{ padding: 5 }}>
              <TextInput
                placeholder={'Add notes'}
                placeholderTextColor='#cdd2c9'
                value={item.notes}
                multiline
                style={styles.notesInput}
                onChangeText={this.onNotesChange.bind(this)}
              />
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
    width: '75%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#28313b',
    backgroundColor: '#555B6E',
  },
  notesInput: {
    height: 130,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#cdd2c9',
    padding: 10,
    color: '#fcefef'
  },
});

export default connect(null, { toggleNotesModal, notesChanged, cancelAllNotifications })(NotesModal);
