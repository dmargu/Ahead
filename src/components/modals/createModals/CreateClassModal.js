import React, { Component } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import TimePickerModal from '../TimePickerModal';
import { toggleCreateClassModal } from '../../../actions';

const validationSchema = yup.object().shape({ //THIS VALIDATION IS NOT FINISHED
  className: yup.string().required(),
  firstDayOfClass: yup.string().required(),
  lastDayOfClass: yup.string().required(),
  classStartTime: yup.date().required(),
  classEndTime: yup.date().required()
});

const ClassDatePicker = (props) => {
  return (
    <View style={styles.datePickerRow}>
      <Text style={styles.textStyle}>{props.textTitle}</Text>
      <View style={styles.inputDateBorder}>
        <View style={{ justifyContent: 'center', padding: 3 }}>
          <TextInput
            style={styles.dateTextInput}
            onChangeText={props.changeHandle}
            placeholder='mm/dd/yyyy'
            placeholderTextColor='#fcefef'
          />
        </View>
      </View>
    </View>
  );
};

const ClassTimePicker = (props) => {
  return (
    <View style={styles.datePickerRow}>
      <Text style={styles.textStyle}>{props.textTitle}</Text>
      <TouchableOpacity onPress={props.onPress}>
        {props.value ?
          <Text style={styles.addTime}>
            {moment(props.value).format('h:mm a')}
          </Text>
          : <Text style={styles.addTime}>Add Time</Text>
        }
      </TouchableOpacity>
    </View>
  );
};

class CreateClassModal extends Component {
  constructor() {
    super();
    this.state = {
      startPickerVisible: false,
      endPickerVisible: false
    };
  }
  closeHandleStart() {
    return (
      this.setState({ startPickerVisible: false })
    );
  }
  closeHandleEnd() {
    return (
      this.setState({ endPickerVisible: false })
    );
  }
  classEndTimeOnPress(classStartTime) { //do this in form validation
    return (classStartTime ? this.setState({ endPickerVisible: true })
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
  render() { //do something to make sure end time isn't before start time for class time
    return (
      <Modal transparent animationType='fade' visible={this.props.createClassModalVisible}>
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
                  color={'#db5461'}
                  onPress={() => this.props.toggleCreateClassModal()}
                />
              </View>
            </View>
            <Formik
              initialValues={{
                className: '',
                firstDayOfClass: '',
                lastDayOfClass: '',
                classStartTime: null,
                classEndTime: null,
              }}
              validationSchema={validationSchema}
              //onSubmit{(values) => {
                //console.log(values);
            //  }}
            >
              {formikProps => (
                <View>
                  <View style={styles.inputView}>
                    <View style={styles.inputBorder}>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={formikProps.handleChange('className')}
                        onBlur={formikProps.handleBlur('className')}
                        autoCapitalize='sentences'
                        placeholder='Class Name'
                        placeholderTextColor='#fcefef'
                      />
                    </View>
                    <Text style={styles.textError}>
                      {formikProps.touched.className && formikProps.errors.className}
                    </Text>
                  </View>

                  <View style={styles.dateContainerView}>
                    <ClassDatePicker
                      textTitle={'First Day Of Class:'}
                      changeHandle={formikProps.handleChange('firstDayOfClass')}
                    />
                    <ClassDatePicker
                      textTitle={'Last Day Of Class:'}
                      changeHandle={formikProps.handleChange('lastDayOfClass')}
                    />
                  </View>

                  <View style={styles.dateContainerView}>
                    <ClassTimePicker
                      textTitle={'Class Starts At:'}
                      value={formikProps.values.classStartTime}
                      onPress={() => this.setState({ startPickerVisible: true })}
                    />
                    <ClassTimePicker
                      textTitle={'Class Ends At:'}
                      value={formikProps.values.classEndTime}
                      onPress={() => this.setState({ endPickerVisible: true })}
                    />
                  </View>

                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={null}>
                      <Text style={styles.textStyle}>Create</Text>
                    </TouchableOpacity>
                  </View>

                  <TimePickerModal
                    isVisible={this.state.startPickerVisible}
                    closeHandle={this.closeHandleStart.bind(this)}
                    time={formikProps.values.classStartTime}
                    formikProps={formikProps}
                    value={'classStartTime'}
                  />
                  <TimePickerModal
                    isVisible={this.state.endPickerVisible}
                    closeHandle={this.closeHandleEnd.bind(this)}
                    time={formikProps.values.classEndTime}
                    formikProps={formikProps}
                    value={'classEndTime'}
                  />
                </View>
              )}
            </Formik>
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
    width: '90%',
    height: 600,
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
    color: '#fcefef',
  },
  dateTextInput: {
    fontSize: 16,
    height: 35,
    width: 120,
    color: '#fcefef'
  },
  inputBorder: {
    borderBottomWidth: 1,
    borderColor: '#28313b',
    left: 5,
    width: 250
  },
  inputDateBorder: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#28313b',
    width: 120,
    left: 5,
  },
  textStyle: {
    fontSize: 16,
    color: '#fcefef'
  },
  textError: {
    color: '#db5461',
    padding: 5
  },
  addTime: {
    fontSize: 16,
    color: '#db5461',
    left: 5
  },
  datePickerRow: {
    flexDirection: 'row',
    paddingBottom: 10,
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
    backgroundColor: '#db5461'
  },
});

function mapStateToProps(state) {
  return {
    createClassModalVisible: state.ModalReducer.createClassModalVisible
  };
}

export default connect(mapStateToProps, { toggleCreateClassModal })(CreateClassModal);
