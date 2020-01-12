import React, { Component } from 'react';
import {
  DatePickerIOS,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import { colors, fonts } from '../../styles';

class CustomDateModal extends Component {
  render() {
    return (
      <Modal
        animationType='slide'
        transparent
        visible={this.props.isVisible}
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerModalConfig}>
            <View style={{ padding: 5 }}>
              <DatePickerIOS
                minuteInterval={5}
                date={this.props.time ? moment(this.props.time).toDate() : new Date()}
                onDateChange={(date) => this.props.changeDate(date)}
                minimumDate={new Date()}
              />
            </View>
            <View style={{ paddingBottom: 5, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => this.props.closeHandle()}
              >
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  pickerModal: {
    position: 'absolute',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.mainDark,
    backgroundColor: colors.darkGrey,
    bottom: HEIGHT / 3,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  pickerModalConfig: {
    height: 230,
    width: 315,
    marginBottom: 35
  },
  doneButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colors.mainRed,
    width: 60
  },
  doneText: {
    padding: 2,
    fontSize: fonts.buttonText,
    color: colors.mainRed,
    fontFamily: fonts.fontFamily
  }
});

export default CustomDateModal;
