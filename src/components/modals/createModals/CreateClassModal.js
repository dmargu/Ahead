import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { CheckBox } from 'react-native-elements';
import TimePickerModal from '../OnlyTimePickerModal';
import DatePickerModal from '../OnlyDatePickerModal';
import DaysInWeekPicker from '../../DaysInWeekPicker';
import { registerForPushNotificationsAsync } from '../../../functions/pushNotificationsRegister';
import { toggleCreateClassModal, createClass } from '../../../actions';
import { Spinner } from '../../common/Spinner';
import { colors } from '../../../styles';

const validationSchema = yup.object().shape({ //THIS FORM NEEDS TO BE OPTIMIZED SO IT LOOKS BETTER
  name: yup.string().required('Your class doesn\'t have a name?'), //AND IS QUICKER FOR USER
  firstDayOfClass: yup.date().required('What day is the first class?'),
  lastDayOfClass: yup.date().required('What day is the last class?'),
  classStartTime: yup.date().required('What time of day does class start?'),
  classEndTime: yup.date().required('What time of day does class end?'),
}); //right now we aren't checking for days of the week bc if it's online class then there might not be a day
 //in future maybe if they don't pick any days we just ask them if it's an online class and if they're sure
const ClassTimePicker = (props) => { //also if it's an online class classStartTime/EndTime won't matter so
  return ( //we can't force people to do it
    <View style={styles.datePickerRow}>
      <Text style={styles.textStyle}>{props.textTitle}</Text>
      <TouchableOpacity onPress={props.onPress}>
        {props.value ?
          <Text style={styles.addTime}>
            {moment(props.value).format(props.day ? 'MMM Do YYYY' : 'h:mm a')}
          </Text>
          : <Text style={styles.addTime}>Add Time</Text>
        }
      </TouchableOpacity>
    </View>
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

class CreateClassModal extends Component {
  constructor() {
    super();
    this.state = {
      startTimePickerVisible: false,
      endTimePickerVisible: false,
      firstDatePickerVisible: false,
      lastDatePickerVisible: false
    };
  }

  classEndTimeOnPress(classStartTime) {
    return (classStartTime ? this.setState({ endTimePickerVisible: true })
      : Alert.alert(
        'Set a start time first.',
        null,
        [
          { text: 'OK' }
        ],
          { cancelable: false }
        )
    );
  }
  classLastDateOnPress(firstDayOfClass) {
    return (firstDayOfClass ? this.setState({ lastDatePickerVisible: true })
      : Alert.alert(
        'Set the first day of class before.',
        null,
        [
          { text: 'OK' }
        ],
          { cancelable: false }
        )
    );
  }
  render() {
    return (
      <Modal transparent animationType='fade' visible={this.props.createClassModalVisible}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.containerStyle}>
            <View style={styles.modalContainer}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <View style={{ padding: 10 }}>
                  <Text style={styles.modalTitle}>Create A Class</Text>
                </View>
                <View style={{ padding: 5 }}>
                  <Feather
                    name="x-square"
                    size={35}
                    color={colors.lightGrey}
                    onPress={() => this.props.toggleCreateClassModal()}
                  />
                </View>
              </View>
              <Formik
                initialValues={{
                  name: '',
                  firstDayOfClass: '',
                  lastDayOfClass: '',
                  classStartTime: '',
                  classEndTime: '',
                  afterClassReminders: false,
                  daysOfWeek: {
                    m: false,
                    t: false,
                    w: false,
                    r: false,
                    f: false,
                    sa: false,
                    su: false
                  },
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => this.props.createClass(values, actions)}
              >
                {formikProps => (
                  <View>
                    <View style={styles.inputView}>
                      <View style={styles.inputBorder}>
                        <TextInput
                          style={styles.textInput}
                          onChangeText={formikProps.handleChange('name')}
                          onBlur={formikProps.handleBlur('name')}
                          autoCapitalize='sentences'
                          placeholder='Class Name'
                          placeholderTextColor={colors.mainLightText}
                        />
                      </View>
                      <Text style={styles.textError}>
                        {formikProps.touched.name && formikProps.errors.name}
                      </Text>
                    </View>

                    <View style={styles.dateContainerView}>
                      <ClassTimePicker
                        textTitle={'First Day Of Class:'}
                        value={formikProps.values.firstDayOfClass}
                        onPress={() => this.setState({ firstDatePickerVisible: true })}
                        day
                      />
                      <Text style={styles.textError}>
                        {formikProps.touched.firstDayOfClass && formikProps.errors.firstDayOfClass}
                      </Text>

                      <ClassTimePicker
                        textTitle={'Last Day Of Class:'}
                        value={formikProps.values.lastDayOfClass}
                        onPress={() => this.classLastDateOnPress(formikProps.values.firstDayOfClass)}
                        day
                      />
                      <Text style={styles.textError}>
                        {formikProps.touched.lastDayOfClass && formikProps.errors.lastDayOfClass}
                      </Text>

                      <ClassTimePicker
                        textTitle={'Class Starts At:'}
                        value={formikProps.values.classStartTime}
                        onPress={() => this.setState({ startTimePickerVisible: true })}
                      />
                      <Text style={styles.textError}>
                        {formikProps.touched.classStartTime && formikProps.errors.classStartTime}
                      </Text>

                      <ClassTimePicker
                        textTitle={'Class Ends At:'}
                        value={formikProps.values.classEndTime}
                        onPress={() => this.classEndTimeOnPress(formikProps.values.classStartTime)}
                      />
                      <Text style={styles.textError}>
                        {formikProps.touched.classEndTime && formikProps.errors.classEndTime}
                      </Text>
                    </View>

                    <View style={styles.viewContainer}>
                      <Text style={styles.modalTitle}>Days Of The Week</Text>
                    </View>
                    <View style={styles.viewContainer}>
                      <DaysInWeekPicker formikProps={formikProps} />
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={styles.textStyle}>
                        Would you like to be reminded after class to enter your homework?
                      </Text>
                    </View>
                    <CheckBox
                      title={'Yes'}
                      textStyle={styles.textStyle}
                      checked={formikProps.values.afterClassReminders}
                      iconRight
                      containerStyle={styles.checkBox}
                      checkedColor={colors.green}
                      onPress={async () => {
                        const permission = await registerForPushNotificationsAsync();
                        if (permission) {
                          formikProps.setFieldValue(
                            'afterClassReminders', !formikProps.values.afterClassReminders);
                        } else {
                          CannotSendNotificationsAlert();
                        }
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

                    <TimePickerModal
                      isVisible={this.state.startTimePickerVisible}
                      closeHandle={() => this.setState({ startTimePickerVisible: false })}
                      time={formikProps.values.classStartTime}
                      formikProps={formikProps}
                      value={'classStartTime'}
                    />
                    <TimePickerModal
                      isVisible={this.state.endTimePickerVisible}
                      closeHandle={() => this.setState({ endTimePickerVisible: false })}
                      time={formikProps.values.classEndTime}
                      formikProps={formikProps}
                      value={'classEndTime'}
                      startTime={formikProps.values.classStartTime}
                    />
                    <DatePickerModal
                      isVisible={this.state.firstDatePickerVisible}
                      closeHandle={() => this.setState({ firstDatePickerVisible: false })}
                      time={formikProps.values.firstDayOfClass}
                      formikProps={formikProps}
                      value={'firstDayOfClass'}
                    />
                    <DatePickerModal
                      isVisible={this.state.lastDatePickerVisible}
                      closeHandle={() => this.setState({ lastDatePickerVisible: false })}
                      time={formikProps.values.lastDayOfClass}
                      formikProps={formikProps}
                      value={'lastDayOfClass'}
                      startTime={formikProps.values.firstDayOfClass}
                    />
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
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3
  },
  textContainer: {
    justifyContent: 'flex-start',
    left: 5,
    paddingTop: 5
  },
  modalContainer: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkGrey,
    height: 575,
    backgroundColor: colors.darkGrey
  },
  modalTitle: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold'
  },
  inputView: {
    padding: 5,
  },
  dateContainerView: {
    padding: 5,
    justifyContent: 'flex-start',
    left: 5,
  },
  textInput: {
    fontSize: 16,
    height: 35,
    width: 250,
    color: colors.white,
  },
  inputBorder: {
    borderBottomWidth: 1,
    borderColor: colors.mainDark,
    left: 5,
    width: 250
  },
  textStyle: {
    fontSize: 16,
    color: colors.white
  },
  textError: {
    color: colors.darkRed,
    padding: 2
  },
  addTime: {
    fontSize: 16,
    color: colors.mainRed,
    left: 5
  },
  datePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: colors.mainRed
  },
  createButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 75
  },
  checkBox: {
    backgroundColor: null,
    borderWidth: 0,
    right: 15,
    padding: 0
  }
});

function mapStateToProps(state) {
  return {
    createClassModalVisible: state.ModalReducer.createClassModalVisible
  };
}

export default connect(mapStateToProps, { toggleCreateClassModal, createClass })(CreateClassModal);
