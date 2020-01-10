import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import moment from 'moment';
import ClassAssignmentsList from './ClassAssignmentsList';
import { registerForPushNotificationsAsync } from '../../functions/pushNotificationsRegister';
import {
  changeLocation,
  changeOfficeHours,
  removeClass,
  scheduleAfterClassReminders,
  cancelAfterClassReminders
} from '../../actions';
import { colors, fonts } from '../../styles';

const DeleteClassAlert = (deleteClass, item, cancelNotifications, notificationIDs) => {
  return (
    Alert.alert(
      'Are you sure? No going back.',
      null,
      [
        { text: 'Yup. Delete it.',
          onPress: () => {
            deleteClass(item);
            cancelNotifications(item, null, notificationIDs);
          }
        },
        { text: 'Whoops didn\'t mean to press that',
          style: 'cancel'
        }
      ],
        { cancelable: false }
    )
  );
};

const CannotSendNotificationsAlert = () => {
  return (
    Alert.alert(
      'Cannot send notifications without permission.',
      null,
      [
        { text: 'OK' }
      ],
        { cancelable: false }
    )
  );
};

class MainClassModal extends Component {
  constructor() {
    super();
    this.state = {
      deleteAlertVisible: false,
      switchDisabled: false,
      schedulingReminders: false
    };
  }
  classTimeText() {
    const item = this.props.item;
    const weekDays = item.daysOfWeek.join(' ');
    const startTime = moment(item.classStartTime).format(' h:mm-');
    const endTime = moment(item.classEndTime).format('h:mm a');
    const finalString = weekDays.concat(startTime, endTime);
    return (finalString);
  }
  render() {
    const item = this.props.item;
    return (
      <Modal
        animationType='slide'
        transparent
        visible={this.props.isVisible}
        onBackdropPress={() => this.props.closeHandle()}
        avoidKeyboard
      >
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.textSeperator}>
              <Text style={styles.className}>{item.name}</Text>
            </View>
            <View style={styles.textSeperator}>
              <Text style={styles.normalText}>{this.classTimeText()}</Text>
            </View>
            <ClassAssignmentsList item={item} />
            <View style={styles.inputViewStyle}>
              <Text style={styles.normalText}>Location:</Text>
              <TextInput
                style={styles.textInput}
                value={item.location}
                onChangeText={(text) => this.props.changeLocation(item, text)}
                autoCapitalize='sentences'
                placeholder='Building 1 room 100'
                placeholderTextColor={colors.mainLightText}
              />
            </View>
            <View style={styles.inputViewStyle}>
              <Text style={styles.normalText}>Office Hours:</Text>
              <TextInput
                value={item.officeHours}
                style={styles.textInput}
                onChangeText={(text) => this.props.changeOfficeHours(item, text)}
                autoCapitalize='sentences'
                placeholder='MW at 4pm'
                placeholderTextColor={colors.mainLightText}
              />
            </View>

            {!this.state.switchDisabled &&
              <View style={styles.switchStyle}>
                <Text style={styles.normalText}>After Class Reminders</Text>
                <View style={{ padding: 5 }}>
                  <Switch
                    value={item.afterClassReminders}
                    trackColor={{ true: colors.green }}
                    onValueChange={async (bool) => {
                      if (bool) {
                        const permission = await registerForPushNotificationsAsync();
                        if (permission) {
                          this.setState({ switchDisabled: true, schedulingReminders: true });
                          this.props.scheduleAfterClassReminders(item,
                            () => this.setState({ switchDisabled: false })
                          );
                        } else {
                          CannotSendNotificationsAlert();
                        }
                      } else {
                        this.setState({ switchDisabled: true, schedulingReminders: false });
                        this.props.cancelAfterClassReminders(item,
                          () => this.setState({ switchDisabled: false }),
                          this.props.notificationIDs
                        );
                      }
                    }}
                  />
                </View>
              </View>
            }
            {this.state.switchDisabled &&
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.normalText, { color: colors.mainRed }]}>
                  {this.state.schedulingReminders ? 'Please wait, scheduling reminders'
                  : 'Please wait, cancelling reminders'}
                </Text>
                <ActivityIndicator size='large' />
              </View>
            }
            <View style={{ padding: 5 }}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  DeleteClassAlert(this.props.removeClass,
                    item,
                    this.props.cancelAfterClassReminders,
                    this.props.notificationIDs)
                }
              >
                <Text style={[styles.normalText, { color: colors.mainRed }]}>Delete Class</Text>
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
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.mainDark,
    backgroundColor: colors.darkGrey
  },
  className: {
    fontSize: fonts.headerText,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: fonts.fontFamily,
  },
  normalText: {
    fontSize: fonts.normalText,
    color: colors.white,
    fontFamily: fonts.fontFamily
  },
  textSeperator: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2
  },
  inputViewStyle: {
    flexDirection: 'row',
    padding: 5
  },
  textInput: {
    fontSize: fonts.normalText,
    color: colors.white,
    fontFamily: fonts.fontFamily,
    paddingLeft: 5
  },
  switchStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5
  },
  buttonContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colors.mainRed,
    width: 150,
  }
});

function mapStateToProps(state) {
  return {
    notificationIDs: state.StorageReducer.notificationIDs
  };
}

export default connect(mapStateToProps,
  { changeLocation,
    changeOfficeHours,
    removeClass,
    scheduleAfterClassReminders,
    cancelAfterClassReminders
  })(MainClassModal);
