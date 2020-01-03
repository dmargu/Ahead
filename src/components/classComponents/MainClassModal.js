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
import {
  changeLocation,
  changeOfficeHours,
  removeClass,
  scheduleAfterClassReminders,
  cancelAfterClassReminders
} from '../../actions';

const DeleteClassAlert = (deleteClass, item) => {
  return (
    Alert.alert(
      'Are you sure? No going back.',
      null,
      [
        { text: 'Yup. Delete it.',
          onPress: () => deleteClass(item)
        },
        { text: 'Whoops didn\'t mean to press that',
          style: 'cancel'
        }
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
      switchDisabled: false
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
                placeholderTextColor='#cdd2c9'
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
                placeholderTextColor='#cdd2c9'
              />
            </View>

            {/*{!this.state.switchDisabled &&
              <View style={styles.spinnerSwitchStyle}>
                <Switch
                  value={item.afterClassReminders}
                  trackColor={{ true: '#82ff9e' }}
                  onValueChange={(bool) => {
                    if (bool) {
                      this.setState({ switchDisabled: true });
                      this.props.scheduleAfterClassReminders(item,
                        () => this.setState({ switchDisabled: false })
                      );
                    } else {
                      this.setState({ switchDisabled: true });
                      this.props.cancelAfterClassReminders(item,
                        () => this.setState({ switchDisabled: false })
                      );
                    }
                  }}
                />
              </View>
            }
            {this.state.switchDisabled &&
              <View style={styles.spinnerSwitchStyle}>
                <ActivityIndicator size='large' />
              </View>
            }*/}

            <TouchableOpacity
              onPress={() => DeleteClassAlert(this.props.removeClass, item)}
            >
              <Text>Delete Class</Text>
            </TouchableOpacity>
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
    borderColor: '#28313b',
    backgroundColor: '#555B6E'
  },
  className: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fcefef'
  },
  normalText: {
    fontSize: 16,
    color: '#fcefef'
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
    fontSize: 16,
    color: '#fcefef',
    paddingLeft: 5
  },
  spinnerSwitchStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 5
  }
});

export default connect(null,
  { changeLocation,
    changeOfficeHours,
    removeClass,
    scheduleAfterClassReminders,
    cancelAfterClassReminders
  })(MainClassModal);
