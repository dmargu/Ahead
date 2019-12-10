import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import * as yup from 'yup';
import { Formik } from 'formik';
import { toggleCreateHomeworkModal } from '../../../actions';
import ImagePickerAndList from '../../ImagePickerAndList';
import PictureModal from '../PictureModal';

const validationSchema = yup.object().shape({
  assignmentName: yup.string().required('You need a name.'),
});

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

class CreateHomeworkModal extends Component {
  constructor() {
    super();
    this.state = {
      nextClassPressed: false,
      nightBeforePressed: false,
      customPressed: false,
      oneDayReminder: false,
      twoDayReminder: false,
      threeDayReminder: false,
      oneWeekReminder: false,
      customReminder: false,
      pictures: [],
      pictureModalVisible: false
    };
  }
  render() {
    return (
        <Modal transparent animationType='fade' visible={this.props.createHomeworkModalVisible}>
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
                        //NEED TO CLEAR STATE HERE
                      }}
                    />
                  </View>
                </View>
                <Formik
                  initialValues={{
                    assignmentName: '',
                    dueDate: null,
                    reminders: [],
                    notes: '',
                    pictures: []
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    console.log(values);
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
                          <View>
                            <Text>Class</Text>
                          </View>

                          <View style={{}}>
                            <Text style={styles.textStyle}>Due Date:</Text>
                            <CustomButton
                              text={'Next Class'}
                              onPress={() => {
                                this.setState({ nextClassPressed: !this.state.nextClassPressed });
                                if (this.state.nightBeforePressed || this.state.customPressed) {
                                  this.setState({ nightBeforePressed: false });
                                  this.setState({ customPressed: false });
                                }
                              }}
                              isItemActive={this.state.nextClassPressed}
                            />
                            <CustomButton
                              text={'Night Before Next Class'}
                              onPress={() => {
                                this.setState({ nightBeforePressed: !this.state.nightBeforePressed });
                                if (this.state.nextClassPressed || this.state.customPressed) {
                                  this.setState({ nextClassPressed: false });
                                  this.setState({ customPressed: false });
                                }
                              }}
                              isItemActive={this.state.nightBeforePressed}
                            />
                            <CustomButton
                              text={'Custom'}
                              onPress={() => {
                                this.setState({ customPressed: !this.state.customPressed });
                                if (this.state.nextClassPressed || this.state.nightBeforePressed) {
                                  this.setState({ nextClassPressed: false });
                                  this.setState({ nightBeforePressed: false });
                                }
                              }}
                              isItemActive={this.state.customPressed}
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
                              this.setState({ oneDayReminder: !this.state.oneDayReminder });
                            }}
                            isItemActive={this.state.oneDayReminder}
                          />
                          <CustomButton
                            text={'2 Days Before'}
                            onPress={() => {
                              this.setState({ twoDayReminder: !this.state.twoDayReminder });
                            }}
                            isItemActive={this.state.twoDayReminder}
                          />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <CustomButton
                            text={'3 Days Before'}
                            onPress={() => {
                              this.setState({ threeDayReminder: !this.state.threeDayReminder });
                            }}
                            isItemActive={this.state.threeDayReminder}
                          />
                          <CustomButton
                            text={'1 Week Before'}
                            onPress={() => {
                              this.setState({ oneWeekReminder: !this.state.oneWeekReminder });
                            }}
                            isItemActive={this.state.oneWeekReminder}
                          />
                          <CustomButton
                            text={'Custom'}
                            onPress={() => {
                              this.setState({ customReminder: !this.state.customReminder });
                            }}
                            isItemActive={this.state.customReminder}
                          />
                        </View>

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
                          pictureModalVisible={this.state.pictureModalVisible}
                          modalCloseHandle={() => this.setState({ pictureModalVisible: false })}
                          modalOpenHandle={() => this.setState({ pictureModalVisible: true })}
                        />

                        <View style={styles.createButton}>
                          <TouchableOpacity style={styles.buttonContainer} onPress={formikProps.handleSubmit}>
                            <Text style={styles.textStyle}>Create</Text>
                          </TouchableOpacity>
                        </View>
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
    width: '90%',
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
  },
});

function mapStateToProps(state) {
  return {
    createHomeworkModalVisible: state.ModalReducer.createHomeworkModalVisible
  };
}

export default connect(mapStateToProps, { toggleCreateHomeworkModal })(CreateHomeworkModal);
