import React, { Component } from 'react';
import {
  DatePickerIOS,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';

const HEIGHT = Dimensions.get('window').height;

class TimePickerModal extends Component {
  render() {
    return (
      <Modal
        animationType='slide'
        transparent
        visible={this.props.isVisible}
        onBackdropPress={() => this.props.closeHandle()}
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerModalConfig}>
            <View style={{ padding: 5 }}>
              <DatePickerIOS //need some conditional if its android right here
                mode={'time'}
                minuteInterval={5}
                date={this.props.time ? moment(this.props.time).toDate() : new Date()}
                onDateChange={(date) => this.props.formikProps.setFieldValue(this.props.value, date)}
                minimumDate={(this.props.value === 'classEndTime') ? this.props.startTime : null}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  pickerModal: {
    position: 'absolute',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#28313b',
    backgroundColor: '#555B6E',
    bottom: HEIGHT / 3,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  pickerModalConfig: {
    height: 175,
    width: 215,
    marginBottom: 35
  },
  dateStyle: {
    color: '#db5461',
    fontSize: 20
  },
  clearDateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#db5461'
  },
  clearDateText: {
    padding: 2,
    fontSize: 18
  }
});

export default TimePickerModal;
