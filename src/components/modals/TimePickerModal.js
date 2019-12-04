import React, { Component } from 'react';
import {
  DatePickerIOS,
  View,
  StyleSheet,
  Modal,
  Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';

const HEIGHT = Dimensions.get('window').height;

class TimePickerModal extends Component {
  render() {
    return (
      <Modal animationType='slide' transparent visible={this.props.isVisible}>
        <View style={styles.pickerModal}>
          <View style={styles.pickerModalConfig}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
              <Feather
                name="x-square"
                size={35}
                color={'#db5461'}
                onPress={() => this.props.closeHandle()}
              />
            </View>
            <View style={{ padding: 5 }}>
              <DatePickerIOS //need some conditional if its android right here
                mode={'time'}
                minuteInterval={5}
                date={this.props.time ? moment(this.props.time).toDate() : new Date()}
                onDateChange={(date) => this.props.formikProps.setFieldValue(this.props.value, date)}
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
    height: 250,
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
