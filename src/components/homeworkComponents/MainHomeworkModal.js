import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import moment from 'moment';
import MainItemDatePickerModal from '../modals/MainItemDatePickerModal';
import CustomDateModal from '../modals/CustomDatePicker';
import ImagePickerAndList from '../ImagePickerAndList';
import FullPicture from '../FullPicture';
import ReminderButton from '../ReminderButton';
import {
  toggleItemModal,
  toggleItemModalDatePicker,
  notesChanged,
  addPicture,
  cancelNotification,
  defaultHomeworkReminder,
  customHomeworkReminder,
  changeCustomReminder
} from '../../actions';

class MainHomeworkModal extends Component {
  constructor() {
    super();
    this.state = {
      fullPictureVisible: false,
      selectedPicture: null,
      oneDayButtonDisabled: false,
      twoDayButtonDisabled: false,
      threeDayButtonDisabled: false,
      customButtonDisabled: false,
      customReminderPickerVisible: false,
      dueDatePickerVisible: false
    };
  }
  render() {
    const item = this.props.item;
    return (
      <Modal
        animationType='fade'
        transparent
        visible={this.props.isVisible}
        onBackdropPress={() => this.props.closeHandle()}
      >
        {this.state.fullPictureVisible && //not working right
            <FullPicture
              picture={this.state.selectedPicture}
              closeImage={() => this.setState({ fullPictureVisible: false })}
            />
        }
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'space-between' }}>
              <Text>{item.assignmentName}</Text>
              {item.className && <Text>{item.className}</Text>}
              <TouchableHighlight
                onPress={() => this.setState({ dueDatePickerVisible: true })}
                underlayColor={null}
              >
                {item.date ?
                  <Text>
                    Due: {moment(item.date).format('MMM DD h:mm a')}
                  </Text>
                  : <Text>Set Due Date</Text>
                }
              </TouchableHighlight>
            </View>
            <View style={{ padding: 5 }}>
              <TextInput
                placeholder={'Add notes'}
                placeholderTextColor='#cdd2c9'
                value={item.notes}
                multiline
                style={styles.notesInput}
                onChangeText={(text) => this.props.notesChanged(text, item)} //won't reset notifications
              />
            </View>
            <ImagePickerAndList
              pictures={item.pictures}
              addPicture={(newArr) => this.props.addPicture(newArr, item)}
              fullPictureVisible={this.state.fullPictureVisible}
              fullPictureOpenHandle={(picture) => {
                this.setState({ fullPictureVisible: true });
                this.setState({ selectedPicture: picture });
              }}
            />

            {item.date && <View style={styles.container}>
              <Text style={styles.remindersText}>Reminders</Text>
            </View>}
            {item.date && <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <ReminderButton
                text='1 Day'
                reminderType='oneDay'
                buttonDisabledState={this.state.oneDayButtonDisabled}
                changeButtonDisabledState={(value) => this.setState({ oneDayButtonDisabled: value })}
                addReminderFunction={() => this.props.defaultHomeworkReminder(item, 'oneDay', 1)}
                cancelNotification={() => this.props.cancelNotification(item.id, 'oneDay')}
                isReminderActive={item.oneDayReminder}
                date={item.date}
                isCustomReminder={false}
              />
              <ReminderButton
                text='2 Days'
                reminderType='twoDay'
                buttonDisabledState={this.state.twoDayButtonDisabled}
                changeButtonDisabledState={(value) => this.setState({ twoDayButtonDisabled: value })}
                addReminderFunction={() => this.props.defaultHomeworkReminder(item, 'twoDay', 2)}
                cancelNotification={() => this.props.cancelNotification(item.id, 'twoDay')}
                isReminderActive={item.twoDayReminder}
                date={item.date}
                isCustomReminder={false}
              />
              <ReminderButton
                text='3 Days'
                reminderType='threeDay'
                buttonDisabledState={this.state.threeDayButtonDisabled}
                changeButtonDisabledState={(value) => this.setState({ threeDayButtonDisabled: value })}
                addReminderFunction={() => this.props.defaultHomeworkReminder(item, 'threeDay', 3)}
                cancelNotification={() => this.props.cancelNotification(item.id, 'threeDay')}
                isReminderActive={item.threeDayReminder}
                date={item.date}
                isCustomReminder={false}
              />
              <ReminderButton //add reminder function moves to custom date modal for this one
                text='Custom'
                reminderType='custom'
                buttonDisabledState={this.state.customButtonDisabled}
                changeButtonDisabledState={(value) => this.setState({ customButtonDisabled: value })}
                cancelNotification={() => this.props.cancelNotification(item.id, 'custom')}
                isReminderActive={item.customReminder}
                date={item.date}
                isCustomReminder
                customReminderTime={item.customReminderTime}
                makeDatePickerVisible={() => this.setState({ customReminderPickerVisible: true })}
              />
            </View>}

          </View>
        </View>
        <CustomDateModal
          isVisible={this.state.customReminderPickerVisible}
          closeHandle={() => {
            this.setState({ customReminderPickerVisible: false });
            this.props.customHomeworkReminder(item, item.customReminderTime);
          }}
          time={item.customReminderTime}
          changeDate={(date) => this.props.changeCustomReminder(item.id, date)}
        />
        <MainItemDatePickerModal
          item={item}
          isVisible={this.state.dueDatePickerVisible}
          closeHandle={() => this.setState({ dueDatePickerVisible: false })}
        />
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
    width: '90%',
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
  textStyle: {
    paddingTop: 15,
    paddingLeft: 15,
    fontSize: 18,
    color: '#fcefef'
  },
  setTime: {
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: 18,
    color: '#db5461'
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

export default connect(null, {
  toggleItemModal,
  toggleItemModalDatePicker,
  notesChanged,
  addPicture,
  cancelNotification,
  defaultHomeworkReminder,
  customHomeworkReminder,
  changeCustomReminder
})(MainHomeworkModal);
