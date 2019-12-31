import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import moment from 'moment';
import ClassAssignmentsList from './ClassAssignmentsList';
import { changeLocation, changeOfficeHours } from '../../actions';

class MainHomeworkModal extends Component {
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
    console.log(item.daysOfWeek);
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
});

function mapStateToProps(state) {
  return {
    homework: state.ClassesReducer.homework
  };
}

export default connect(mapStateToProps, { changeLocation, changeOfficeHours })(MainHomeworkModal);
