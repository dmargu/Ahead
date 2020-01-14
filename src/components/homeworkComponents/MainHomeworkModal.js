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
import { colors, fonts } from '../../styles';

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
        animationIn='fadeIn'
        animationOut='fadeOut'
        backdropTransitionOutTiming={0}
        hasBackDrop
        backdropOpacity={0.9}
        transparent
        isVisible={this.props.isVisible}
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
            <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.title}>{item.assignmentName}</Text>
              {item.className && <Text style={styles.textStyle}>{item.className}</Text>}
              <TouchableHighlight
                onPress={() => this.setState({ dueDatePickerVisible: true })}
                underlayColor={null}
              >
                {item.date ?
                  <Text style={styles.setTime}>
                    Due: {moment(item.date).format('MMM DD h:mm a')}
                  </Text>
                  : <Text style={styles.setTime}>Set Due Date</Text>
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
            {item.date && <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 5 }}>
              <ReminderButton
                text='1 Day'
                reminderType='oneDay'
                buttonDisabledState={this.state.oneDayButtonDisabled}
                changeButtonDisabledState={(value) => this.setState({ oneDayButtonDisabled: value })}
                addReminderFunction={() => this.props.defaultHomeworkReminder(item, 'oneDay', 1)}
                cancelNotification={() =>
                  this.props.cancelNotification(item.id, 'oneDay', this.props.notificationIDs)
                }
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
                cancelNotification={() =>
                  this.props.cancelNotification(item.id, 'twoDay', this.props.notificationIDs)
                }
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
                cancelNotification={
                  () => this.props.cancelNotification(item.id, 'threeDay', this.props.notificationIDs)
                }
                isReminderActive={item.threeDayReminder}
                date={item.date}
                isCustomReminder={false}
              />
              <ReminderButton //add reminder function moves to custom date modal for this one
                text='Custom'
                reminderType='custom'
                buttonDisabledState={this.state.customButtonDisabled}
                changeButtonDisabledState={(value) => this.setState({ customButtonDisabled: value })}
                cancelNotification={
                  () => this.props.cancelNotification(item.id, 'custom', this.props.notificationIDs)
                }
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
            if (item.customReminderTime) {
              this.props.customHomeworkReminder(item, item.customReminderTime);
            }
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
    borderColor: colors.mainDark,
    backgroundColor: colors.darkGrey
  },
  remindersText: {
    fontSize: fonts.headerText,
    color: colors.mainRed,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily,
    paddingBottom: 5
  },
  textStyle: {
    fontSize: fonts.normalText,
    color: colors.white,
    fontFamily: fonts.fontFamily
  },
  title: {
    fontSize: fonts.headerText,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: fonts.fontFamily
  },
  setTime: {
    paddingLeft: 5,
    fontSize: fonts.normalText,
    color: colors.mainRed,
    fontFamily: fonts.fontFamily
  },
  notesInput: {
    height: 130,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.mainLightText,
    padding: 10,
    color: colors.white,
    fontSize: fonts.normalText,
    fontFamily: fonts.fontFamily
  },
});

function mapStateToProps(state) {
  return {
    notificationIDs: state.StorageReducer.notificationIDs
  };
}

export default connect(mapStateToProps, {
  toggleItemModal,
  toggleItemModalDatePicker,
  notesChanged,
  addPicture,
  cancelNotification,
  defaultHomeworkReminder,
  customHomeworkReminder,
  changeCustomReminder
})(MainHomeworkModal);
