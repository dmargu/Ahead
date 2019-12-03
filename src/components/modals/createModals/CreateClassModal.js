import React, { Component } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import TimePickerModal from '../TimePickerModal';
import { toggleCreateClassModal } from '../../../actions';

class CreateClassModal extends Component {
  constructor() {
    super();
    this.state = {
      className: '',
      firstDayOfClass: '',
      lastDayOfClass: '',
      classStartTime: null,
      classEndTime: null,
      startPickerVisible: false,
      endPickerVisible: false
    };
  }

  classNameHandle(textInput) {
    const goodInput = textInput.trimLeft(); //cuts off if space is first character (no input w/out character)
    return (
      this.setState({ className: goodInput })
    );
  }
  firstDayOfClassHandle(textInput) {
    const goodInput = textInput.trimLeft();
    return (
      this.setState({ firstDayOfClass: goodInput })
    );
  }
  lastDayOfClassHandle(textInput) {
    const goodInput = textInput.trimLeft();
    return (
      this.setState({ lastDayOfClass: goodInput })
    );
  }
  onCreatePress() { //need to check here for proper date input

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
  startDateChangeHandle(date) {
    return (
      this.setState({ classStartTime: date })
    );
  }
  endDateChangeHandle(date) {
    return (
      this.setState({ classEndTime: date })
    );
  }
  classEndTimeOnPress() {
    return (this.state.classStartTime ? this.setState({ endPickerVisible: true })
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
            <View style={styles.inputView}>
              <View style={styles.inputBorder}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={this.classNameHandle.bind(this)}
                  value={this.state.className}
                  autoCapitalize='sentences'
                  placeholder='Class Name'
                  placeholderTextColor='#fcefef'
                />
              </View>
            </View>
            <View style={styles.dateContainerView}>
              <View style={styles.datePickerRow}>
                <Text style={styles.textStyle}>First Day Of Class:</Text>
                <View style={styles.inputDateBorder}>
                  <View style={{ justifyContent: 'center', padding: 3 }}>
                    <TextInput
                      style={styles.dateTextInput}
                      onChangeText={this.firstDayOfClassHandle.bind(this)}
                      value={this.state.firstDayOfClass}
                      autoCapitalize='sentences'
                      placeholder='mm/dd/yyyy'
                      placeholderTextColor='#fcefef'
                    />
                  </View>
                </View>
              </View>
              <View style={styles.datePickerRow}>
                <Text style={styles.textStyle}>Last Day Of Class:</Text>
                <View style={styles.inputDateBorder}>
                  <View style={{ justifyContent: 'center', padding: 3 }}>
                    <TextInput
                      style={styles.dateTextInput}
                      onChangeText={this.lastDayOfClassHandle.bind(this)}
                      value={this.state.lastDayOfClass}
                      autoCapitalize='sentences'
                      placeholder='mm/dd/yyyy'
                      placeholderTextColor='#fcefef'
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.dateContainerView}>
              <View style={styles.datePickerRow}>
                <Text style={styles.textStyle}>Class Starts At:</Text>
                <TouchableOpacity onPress={() => this.setState({ startPickerVisible: true })}>
                  {this.state.classStartTime ?
                    <Text style={styles.addTime}>{moment(this.state.classStartTime).format('h:mm a')}</Text>
                    : <Text style={styles.addTime}>Add Time</Text>
                  }
                </TouchableOpacity>
              </View>
              <View style={styles.datePickerRow}>
                <Text style={styles.textStyle}>Class Ends At:</Text>
                <TouchableOpacity onPress={this.classEndTimeOnPress.bind(this)}>
                  {this.state.classEndTime ?
                    <Text style={styles.addTime}>{moment(this.state.classEndTime).format('h:mm a')}</Text>
                    : <Text style={styles.addTime}>Add Time</Text>
                  }
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.onCreatePress.bind(this)}>
                <Text style={styles.textStyle}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TimePickerModal
            isVisible={this.state.startPickerVisible}
            closeHandle={this.closeHandleStart.bind(this)}
            time={this.state.classStartTime}
            dateChangeHandle={this.startDateChangeHandle.bind(this)}
          />
          <TimePickerModal
            isVisible={this.state.endPickerVisible}
            closeHandle={this.closeHandleEnd.bind(this)}
            time={this.state.classEndTime}
            dateChangeHandle={this.endDateChangeHandle.bind(this)}
          />
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
