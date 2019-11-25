import React, { Component } from 'react';
import {
  DatePickerIOS,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {
  changeDate,
  toggleItemModalDatePicker,
  clearDate,
  cancelAllNotifications,
} from '../../actions';

const HEIGHT = Dimensions.get('window').height;

class MainItemDatePickerModal extends Component {
  onClearDatePress() {
    this.props.cancelAllNotifications(this.props.item);
    this.props.clearDate(this.props.item);
  }
  async onDateChangeHandle(date) {
    await this.props.cancelAllNotifications(this.props.item);
    await this.props.changeDate(date, this.props.item.id);
  }
  render() {
    const item = this.props.item;
    return (
      <Modal animationType='slide' transparent>
        <View style={styles.pickerModal}>
          <View style={styles.pickerModalConfig}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
              <TouchableOpacity
                style={[styles.clearDateButton, { backgroundColor: item.date ? '#db5461' : null }]}
                onPress={this.onClearDatePress.bind(this)}
              >
                <Text style={[styles.clearDateText, { color: item.date ? '#fcefef' : '#db5461' }]}>
                  Clear Date
                </Text>
              </TouchableOpacity>

              <Feather
                name="x-square"
                size={35}
                color={'#db5461'}
                onPress={() => this.props.toggleItemModalDatePicker(item)}
              />
            </View>
            <View style={{ padding: 5 }}>
              <DatePickerIOS //need some conditional if its android right here
                date={item.date ? item.date : new Date()}
                onDateChange={this.onDateChangeHandle.bind(this)}
                minuteInterval={5}
                minimumDate={new Date()}
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
    backgroundColor: '#cdd2c9',
    bottom: HEIGHT / 3,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  pickerModalConfig: {
    height: 250,
    width: 315,
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

export default connect(null, {
  changeDate,
  toggleItemModalDatePicker,
  clearDate,
  cancelAllNotifications,
})(MainItemDatePickerModal);
