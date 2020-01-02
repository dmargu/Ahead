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
import ImagePickerAndList from '../../ImagePickerAndList';
import FullPicture from '../../FullPicture';
import DateAndTimePickerModal from '../DateAndTimePicker';
import { Spinner } from '../../common/Spinner';
import { toggleCreateTestModal, createTest } from '../../../actions';

const validationSchema = yup.object().shape({
  testName: yup.string().required('You need a name.'),
});

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
  testDate: null,
  testDatePickerVisible: false,
  oneDayStudy: false,
  twoDayStudy: false,
  threeDayStudy: false,
  customStudy: false,
  pictures: [],
  fullPictureVisible: false,
  selectedPicture: null,
  customStudyPickerVisible: false,
  customStudyDate: null
};

class CreateTestModal extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  render() {
    return (
      <Modal
        transparent
        animationType='fade'
        visible={this.props.createTestModalVisible}
        style={{ marginHorizontal: 0 }} //not working at all
      >
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
                  <Text style={styles.modalTitle}>Create Test</Text>
                </View>
                <View style={{ padding: 5 }}>
                  <Feather
                    name="x-square"
                    size={35}
                    color={'#db5461'}
                    onPress={() => {
                      this.props.toggleCreateTestModal();
                      this.setState(initialState); //clear state to initial state when user exits form
                    }}
                  />
                </View>
              </View>

              <Formik
                initialValues={{
                  testName: '',
                  notes: '',
                  class: null
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  this.props.createTest(values, this.state, this.props.classes, actions);
                  this.setState(initialState);
                }}
              >
                {formikProps => (
                  <View>
                    <View style={styles.inputView}>
                      <View style={styles.inputBorder}>
                        <TextInput
                          style={styles.textInput}
                          onChangeText={formikProps.handleChange('testName')}
                          onBlur={formikProps.handleBlur('testName')}
                          autoCapitalize='sentences'
                          placeholder='Test Name'
                          placeholderTextColor='#fcefef'
                        />
                      </View>
                      <Text style={styles.textError}>
                        {formikProps.touched.testName && formikProps.errors.testName}
                      </Text>
                      <View style={{ bottom: 20 }}>
                        { this.props.classes.length !== 0 &&
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
                        }
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textStyle}>Date:</Text>
                        <TouchableOpacity
                          onPress={() => this.setState({ testDatePickerVisible: true })}
                        >
                          <Text>
                            {this.state.testDate ? moment(this.state.testDate).format('MMM DD h:mm a')
                              : 'Set Time'}
                          </Text>
                        </TouchableOpacity>

                        <DateAndTimePickerModal
                          isVisible={this.state.testDatePickerVisible}
                          closeHandle={() => this.setState({ testDatePickerVisible: false })}
                          time={this.state.testDate}
                          changeDate={(date) => this.setState({ testDate: date })}
                        />
                      </View>

                      <Text style={{ padding: 2, color: '#fcefef' }}>
                        {'Create To-do\'s to study:'}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <CustomButton
                          text={'1 Day Before'}
                          onPress={() => {
                            if (this.state.testDate) {
                              this.setState({ oneDayStudy: !this.state.oneDayStudy });
                            } else {
                              SetDueDateFirstAlert();
                            }
                          }}
                          isItemActive={this.state.oneDayStudy}
                        />
                        <CustomButton
                          text={'2 Days Before'}
                          onPress={() => {
                            if (this.state.testDate) {
                              this.setState({ twoDayStudy: !this.state.twoDayStudy });
                            } else {
                              SetDueDateFirstAlert();
                            }
                          }}
                          isItemActive={this.state.twoDayStudy}
                        />

                        <CustomButton
                          text={'3 Days Before'}
                          onPress={() => {
                            if (this.state.testDate) {
                              this.setState({ threeDayStudy: !this.state.threeDayStudy });
                            } else {
                              SetDueDateFirstAlert();
                            }
                          }}
                          isItemActive={this.state.threeDayStudy}
                        />
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <CustomButton
                          text={
                            this.state.customStudyDate ?
                            moment(this.state.customStudyDate).format('MMM DD h:mm a')
                            : 'Custom'
                          }
                          onPress={() => {
                            if (!this.state.customStudy) {
                              this.setState({ customStudyPickerVisible: true });
                            }
                            if (this.state.customStudy) {
                              this.setState({ customStudyDate: null });
                            }
                            this.setState({ customStudy: !this.state.customStudy });
                          }}
                          isItemActive={this.state.customStudy}
                        />
                      </View>

                      <DateAndTimePickerModal
                        isVisible={this.state.customStudyPickerVisible}
                        closeHandle={() => {
                          this.setState({ customStudyPickerVisible: false });
                          if (!this.state.customStudyDate) {
                            this.setState({ customStudy: false });
                          }
                        }}
                        time={this.state.customStudyDate}
                        changeDate={(date) => this.setState({ customStudyDate: date })}
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
    createTestModalVisible: state.ModalReducer.createTestModalVisible,
    classes: state.ClassesReducer.classes
  };
}

export default connect(mapStateToProps, { toggleCreateTestModal, createTest })(CreateTestModal);
