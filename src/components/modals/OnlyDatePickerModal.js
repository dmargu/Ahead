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
import { colors } from '../../styles';

const HEIGHT = Dimensions.get('window').height;

class DatePickerModal extends Component {
  render() {
    return (
      <Modal animationType='slide' transparent visible={this.props.isVisible}>
        <View style={styles.pickerModal}>
          <View style={styles.pickerModalConfig}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
              <Feather
                name="x-square"
                size={35}
                color={colors.lightGrey}
                onPress={() => this.props.closeHandle()}
              />
            </View>
            <View style={{ padding: 5 }}>
              <DatePickerIOS //need some conditional if its android right here
                mode={'date'} //maximum date to make sure we don't let them make infinite data
                date={this.props.time ? moment(this.props.time).toDate() : new Date()}
                onDateChange={(date) => this.props.formikProps.setFieldValue(this.props.value, date)}
                minimumDate={(this.props.value === 'lastDayOfClass') ? this.props.startTime : new Date()}
                maximumDate={moment().add(3, 'years').toDate()}
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
    backgroundColor: colors.darkGrey,
    bottom: HEIGHT / 3,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  pickerModalConfig: {
    height: 250,
    width: 250,
    marginBottom: 35
  },
});

export default DatePickerModal;
