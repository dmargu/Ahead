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
import { colors, fonts } from '../../../styles';

const validationSchema = yup.object().shape({
  testName: yup.string().required('You need a name.'),
});

const SetDueDateFirst = () => {
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
        { borderColor: props.isItemActive ? colors.darkGrey : colors.mainRed,
        backgroundColor: props.isItemActive ? colors.green : null
      }]}
      onPress={props.onPress}
    >
      <Text
        style={[styles.textStyle, {
        color: props.isItemActive ? colors.darkGrey : colors.mainRed, fontSize: fonts.subtitleText
        }]}
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
  fourDayStudy: false,
  fiveDayStudy: false,
  sixDayStudy: false,
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
        animationIn='fadeIn'
        animationOut='fadeOut'
        backdropTransitionOutTiming={0} //need this to prevent flicker
        isVisible={this.props.createTestModalVisible}
        hasBackDrop
        //style={{ width: dimensions.width, right: 20 }}
        backdropOpacity={0.9}
        onBackdropPress={() => this.props.toggleCreateTestModal()}
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
                    color={colors.lightGrey}
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
                          placeholder='Midterm'
                          placeholderTextColor={colors.mainLightText}
                        />
                      </View>
                      <Text style={styles.textError}>
                        {formikProps.touched.testName && formikProps.errors.testName}
                      </Text>
                      <View style={{ bottom: 20 }}>
                        { this.props.classes.length !== 0 &&
                          <Dropdown
                            label='Class'
                            baseColor={colors.mainLightText}
                            selectedItemColor={colors.mainDark}
                            textColor={colors.white}
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
                          <Text style={[styles.textStyle, { paddingLeft: 5, color: colors.mainRed }]}>
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
                          placeholderTextColor={colors.mainLightText}
                          value={formikProps.values.notes}
                          multiline
                          style={styles.notesInput}
                          onChangeText={formikProps.handleChange('notes')}
                          onBlur={formikProps.handleBlur('notes')}
                        />
                      </View>

                      <Text style={[styles.textStyle, { padding: 2 }]}>
                        {'Put in my day to study:'}
                      </Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <CustomButton
                          text={'1 Day Before'}
                          onPress={() => {
                            if (this.state.testDate) {
                              this.setState({ oneDayStudy: !this.state.oneDayStudy });
                            } else {
                              SetDueDateFirst();
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
                              SetDueDateFirst();
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
                              SetDueDateFirst();
                            }
                          }}
                          isItemActive={this.state.threeDayStudy}
                        />
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <CustomButton
                          text={'4 Days Before'}
                          onPress={() => {
                            if (this.state.testDate) {
                              this.setState({ fourDayStudy: !this.state.fourDayStudy });
                            } else {
                              SetDueDateFirst();
                            }
                          }}
                          isItemActive={this.state.fourDayStudy}
                        />
                        <CustomButton
                          text={'5 Days Before'}
                          onPress={() => {
                            if (this.state.testDate) {
                              this.setState({ fiveDayStudy: !this.state.fiveDayStudy });
                            } else {
                              SetDueDateFirst();
                            }
                          }}
                          isItemActive={this.state.fiveDayStudy}
                        />

                        <CustomButton
                          text={'6 Days Before'}
                          onPress={() => {
                            if (this.state.testDate) {
                              this.setState({ sixDayStudy: !this.state.sixDayStudy });
                            } else {
                              SetDueDateFirst();
                            }
                          }}
                          isItemActive={this.state.sixDayStudy}
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
                          <Text style={[styles.textStyle, { fontSize: fonts.buttonText }]}>Create</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: 615,
    width: '110%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#28313b',
    backgroundColor: colors.darkGrey
  },
  modalTitle: {
    fontSize: fonts.headerText,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily
  },
  inputBorder: {
    borderBottomWidth: 1,
    borderColor: colors.mainDark,
    left: 5,
    width: 250
  },
  inputView: {
    padding: 5,
  },
  textInput: {
    fontSize: fonts.normalText,
    height: 35,
    width: 250,
    color: colors.white,
    fontFamily: fonts.fontFamily
  },
  textStyle: {
    fontSize: fonts.normalText,
    color: colors.white,
    fontFamily: fonts.fontFamily
  },
  textError: {
    color: colors.darkRed,
    fontSize: fonts.subtitleText,
    fontFamily: fonts.fontFamily,
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
    backgroundColor: colors.mainRed
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
    borderColor: colors.mainLightText,
    padding: 10,
    color: colors.white,
    fontSize: fonts.normalText,
    fontFamily: fonts.fontFamily
  }
});

function mapStateToProps(state) {
  return {
    createTestModalVisible: state.ModalReducer.createTestModalVisible,
    classes: state.ClassesReducer.classes
  };
}

export default connect(mapStateToProps, { toggleCreateTestModal, createTest })(CreateTestModal);
