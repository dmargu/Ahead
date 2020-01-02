import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import * as yup from 'yup';
import { Formik } from 'formik';
import moment from 'moment';
import { Dropdown } from 'react-native-material-dropdown';
import { toggleCreateHomeworkModal, createHomework } from '../../../actions';
import ImagePickerAndList from '../../ImagePickerAndList';
import FullPicture from '../../FullPicture';
import DateAndTimePickerModal from '../DateAndTimePicker';
import { Spinner } from '../../common/Spinner';

const validationSchema = yup.object().shape({
  assignmentName: yup.string().required('You need a name.'),
});

const PickClassFirstAlert = () => {
  return (
    Alert.alert(
      'Pick A Class First.',
      null,
      [
        { text: 'OK' }
      ],
        { cancelable: false }
    )
  );
};

const SetDueDateFirstAlert = () => {
  return (
    Alert.alert(
      'Set A Due Date First.',
      null,
      [
        { text: 'OK' }
      ],
        { cancelable: false }
    )
  );
};

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle,
        { borderColor: props.isItemActive ? '#28313b' : '#db5461',
        backgroundColor: props.isItemActive ? '#82ff9e' : null
      }]}
      onPress={props.onPress}
    >
      <Text
        style={{
        color: props.isItemActive ? '#28313b' : '#fcefef'
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const initialState = { //doing this so you can clear state
  dueNextClass: false,
  dueNightBefore: false,
  dueCustomTime: false,
  oneDayReminder: false,
  twoDayReminder: false,
  threeDayReminder: false,
  customReminder: false,
  pictures: [],
  fullPictureVisible: false,
  selectedPicture: null,
  customReminderPickerVisible: false,
  customReminderDate: null,
  customDueDatePickerVisible: false,
  customDueDate: null
};

class CreateHomeworkModal extends Component { //this class has a bunch of warnings
  constructor() { //I think it's coming from the material drop down and the Full picture which uses image zoom
    super();
    this.state = initialState;
  }
  render() { //for now user will be allowed to enter 3 day reminder even if assignment is due before then
    return ( //they can submit it but our action creator won't schedule it
      <Modal transparent animationType='fade' visible={this.props.createHomeworkModalVisible}>
        {this.state.fullPictureVisible &&
          <FullPicture
            picture={this.state.selectedPicture}
            closeImage={() => this.setState({ fullPictureVisible: false })}
          />
        }
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.containerStyle}>
            <View style={styles.modalContainer}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={{ padding: 10 }}>
                  <Text style={styles.modalTitle}>Create Homework</Text>
                </View>
                <View style={{ padding: 5 }}>
                  <Feather
                    name="x-square"
                    size={35}
                    color={'#db5461'}
                    onPress={() => {
                      this.props.toggleCreateHomeworkModal();
                      this.setState(initialState); //clear state to initial state when user exits form
                    }}
                  />
                </View>
              </View>

              <Formik
                initialValues={{
                  assignmentName: '',
                  notes: '',
                  class: this.props.classNameFromNotification ? this.props.classNameFromNotification : null
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  this.props.createHomework(values, this.state, this.props.classes, actions);
                  this.setState(initialState);
                }}
              >
                {formikProps => (
                  <View>
                    <View style={styles.inputView}>
                      <View style={styles.inputBorder}>
                        <TextInput
                          style={styles.textInput}
                          onChangeText={formikProps.handleChange('assignmentName')}
                          onBlur={formikProps.handleBlur('assignmentName')}
                          autoCapitalize='sentences'
                          placeholder='Assignment Name'
                          placeholderTextColor='#fcefef'
                        />
                      </View>
                      <Text style={styles.textError}>
                        {formikProps.touched.assignmentName && formikProps.errors.assignmentName}
                      </Text>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        { this.props.classes.length !== 0 &&
                          <View style={{ flex: 1, bottom: 20 }}>
                            <Dropdown
                              label='Class'
                              baseColor='#fcefef'
                              data={this.props.classes}
                              valueExtractor={(value) => value.name}
                              value={this.props.classNameFromNotification ?
                                this.props.classNameFromNotification : ''
                              }
                              onChangeText={formikProps.handleChange('class')}
                              dropdownPosition={-2}
                            />
                          </View>
                        }
                        <View style={{ padding: 2 }}>
                          <Text style={styles.textStyle}>Due Date:</Text>
                          { this.props.classes.length !== 0 &&
                            <View>
                              <CustomButton
                                text={'Next Class'}
                                onPress={() => {
                                  if (formikProps.values.class) {
                                    if (this.state.dueNextClass) {
                                      this.setState({ oneDayReminder: false });
                                      this.setState({ twoDayReminder: false });
                                      this.setState({ threeDayReminder: false });
                                      this.setState({ customReminder: false });
                                    }
                                    this.setState({ dueNextClass: !this.state.dueNextClass });
                                  } else {
                                    PickClassFirstAlert();
                                  }
                                  if (this.state.dueNightBefore || this.state.dueCustomTime) {
                                    this.setState({ dueNightBefore: false });
                                    this.setState({ dueCustomTime: false });
                                  }
                                }}
                                isItemActive={this.state.dueNextClass}
                              />
                              <CustomButton
                                text={'Night Before Next Class'}
                                onPress={() => {
                                  if (formikProps.values.class) {
                                    if (this.state.dueNextClass) {
                                      this.setState({ oneDayReminder: false });
                                      this.setState({ twoDayReminder: false });
                                      this.setState({ threeDayReminder: false });
                                      this.setState({ customReminder: false });
                                    }
                                    this.setState({ dueNightBefore: !this.state.dueNightBefore });
                                  } else {
                                    PickClassFirstAlert();
                                  }
                                  if (this.state.dueNextClass || this.state.dueCustomTime) {
                                    this.setState({ dueNextClass: false });
                                    this.setState({ dueCustomTime: false });
                                  }
                                }}
                                isItemActive={this.state.dueNightBefore}
                              />
                            </View>
                          }
                          <CustomButton
                            text={this.state.customDueDate ?
                            moment(this.state.customDueDate).format('MMM DD h:mm a')
                            : 'Custom'
                            }
                            onPress={() => {
                              if (!this.state.dueCustomTime) {
                                this.setState({ customDueDatePickerVisible: true });
                              }

                              if (this.state.dueCustomTime) {
                                this.setState({ customDueDate: null });
                                this.setState({ oneDayReminder: false });
                                this.setState({ twoDayReminder: false });
                                this.setState({ threeDayReminder: false });
                                this.setState({ customReminder: false });
                              }

                              this.setState({ dueCustomTime: !this.state.dueCustomTime });

                              if (this.state.dueNextClass || this.state.dueNightBefore) {
                                this.setState({ dueNextClass: false });
                                this.setState({ dueNightBefore: false });
                              }
                            }}
                            isItemActive={this.state.dueCustomTime}
                          />

                          <DateAndTimePickerModal
                            isVisible={this.state.customDueDatePickerVisible}
                            closeHandle={() => {
                              this.setState({ customDueDatePickerVisible: false });
                              if (!this.state.customDueDate) {
                                this.setState({ dueCustomTime: false });
                              }
                            }}
                            time={this.state.customDueDate}
                            changeDate={(date) => this.setState({ customDueDate: date })}
                          />
                        </View>
                      </View>

                      <Text style={{ padding: 2, color: '#fcefef' }}>
                        Reminders To Complete Assignment:
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <CustomButton
                          text={'1 Day Before'}
                          onPress={() => {
                            if (this.state.dueNextClass
                              || this.state.dueNightBefore || this.state.dueCustomTime) {
                              this.setState({ oneDayReminder: !this.state.oneDayReminder });
                            } else {
                              SetDueDateFirstAlert();
                            }
                          }}
                          isItemActive={this.state.oneDayReminder}
                        />
                        <CustomButton
                          text={'2 Days Before'}
                          onPress={() => {
                            if (this.state.dueNextClass
                              || this.state.dueNightBefore || this.state.dueCustomTime) {
                              this.setState({ twoDayReminder: !this.state.twoDayReminder });
                            } else {
                              SetDueDateFirstAlert();
                            }
                          }}
                          isItemActive={this.state.twoDayReminder}
                        />

                        <CustomButton
                          text={'3 Days Before'}
                          onPress={() => {
                            if (this.state.dueNextClass
                              || this.state.dueNightBefore || this.state.dueCustomTime) {
                              this.setState({ threeDayReminder: !this.state.threeDayReminder });
                            } else {
                              SetDueDateFirstAlert();
                            }
                          }}
                          isItemActive={this.state.threeDayReminder}
                        />
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <CustomButton
                          text={
                            this.state.customReminderDate ?
                            moment(this.state.customReminderDate).format('MMM DD h:mm a')
                            : 'Custom'
                          }
                          onPress={() => {
                            if (!this.state.customReminder) {
                              this.setState({ customReminderPickerVisible: true });
                            }
                            if (this.state.customReminder) {
                              this.setState({ customReminderDate: null });
                            }
                            this.setState({ customReminder: !this.state.customReminder });
                          }}
                          isItemActive={this.state.customReminder}
                        />
                      </View>

                      <DateAndTimePickerModal
                        isVisible={this.state.customReminderPickerVisible}
                        closeHandle={() => {
                          this.setState({ customReminderPickerVisible: false });
                          if (!this.state.customReminderDate) {
                            this.setState({ customReminder: false });
                          }
                        }}
                        time={this.state.customReminderDate}
                        changeDate={(date) => this.setState({ customReminderDate: date })}
                      />

                      <View style={{ padding: 5 }}>
                        <TextInput
                          placeholder={'Add notes'}
                          placeholderTextColor='#cdd2c9'
                          value={formikProps.values.notes}
                          multiline
                          style={styles.notesInput}
                          onChangeText={formikProps.handleChange('notes')}
                          onBlur={formikProps.handleBlur('notes')}
                        />
                      </View>

                      <ImagePickerAndList
                        pictures={this.state.pictures}
                        addPicture={(newArr) => this.setState({ pictures: newArr })}
                        fullPictureVisible={this.state.fullPictureVisible}
                        fullPictureOpenHandle={(picture) => {
                          this.setState({ fullPictureVisible: true });
                          this.setState({ selectedPicture: picture });
                        }}
                      />

                      {formikProps.isSubmitting ? (
                        <View style={styles.createButton}>
                          <TouchableOpacity
                            style={styles.buttonContainer}
                          >
                            <Spinner size='large' />
                          </TouchableOpacity>
                        </View>
                      ) :
                      (<View style={styles.createButton}>
                        <TouchableOpacity style={styles.buttonContainer} onPress={formikProps.handleSubmit}>
                          <Text style={styles.textStyle}>Create</Text>
                        </TouchableOpacity>
                      </View>)}
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    height: 615,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#28313b',
    backgroundColor: '#555B6E'
  },
  modalTitle: {
    fontSize: 18,
    color: '#fcefef',
    fontWeight: 'bold'
  },
  inputBorder: {
    borderBottomWidth: 1,
    borderColor: '#28313b',
    left: 5,
    width: 250
  },
  inputView: {
    padding: 5,
  },
  textInput: {
    fontSize: 16,
    height: 35,
    width: 250,
    color: '#fcefef',
  },
  textStyle: {
    fontSize: 16,
    color: '#fcefef'
  },
  textError: {
    color: '#db5461',
    padding: 2
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#db5461'
  },
  createButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    padding: 5,

  },
  notesInput: {
    height: 130,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#cdd2c9',
    padding: 10,
    color: '#fcefef'
  }
});

function mapStateToProps(state) {
  return {
    createHomeworkModalVisible: state.ModalReducer.createHomeworkModalVisible,
    classes: state.ClassesReducer.classes
  };
}

export default connect(mapStateToProps, { toggleCreateHomeworkModal, createHomework })(CreateHomeworkModal);
