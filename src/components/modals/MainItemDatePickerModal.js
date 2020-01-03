import React, { Component } from 'react';
import {
  DatePickerIOS,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  changeDate,
  toggleItemModalDatePicker,
  clearDate,
  cancelAllNotifications,
} from '../../actions';

const HEIGHT = Dimensions.get('window').height;

class MainItemDatePickerModal extends Component {
  onClearDatePress() {
    this.props.cancelAllNotifications(this.props.item.id, this.props.notificationIDs);
    this.props.clearDate(this.props.item);
  }
  async onDateChangeHandle(date) {
    await this.props.cancelAllNotifications(this.props.item.id, this.props.notificationIDs);
    await this.props.changeDate(date, this.props.item.id);
  }
  render() {
    const item = this.props.item;
    return (
      <Modal
        animationType='slide'
        transparent
        isVisible={this.props.isVisible}
        onBackdropPress={() => this.props.closeHandle()}
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerModalConfig}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
              <TouchableOpacity
                style={[styles.clearDateButton, { backgroundColor: item.date ? '#db5461' : null }]}
                onPress={this.onClearDatePress.bind(this)}
              >
                <Text style={[styles.clearDateText, { color: item.date ? '#fcefef' : '#db5461' }]}>
                  Clear Date
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ padding: 5 }}>
              <DatePickerIOS //need some conditional if its android right here
                date={item.date ? moment(item.date).toDate() : new Date()}
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
    backgroundColor: '#555B6E',
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

function mapStateToProps(state) {
  return {
    notificationIDs: state.StorageReducer.notificationIDs
  };
}

export default connect(mapStateToProps, {
  changeDate,
  toggleItemModalDatePicker,
  clearDate,
  cancelAllNotifications,
})(MainItemDatePickerModal);
