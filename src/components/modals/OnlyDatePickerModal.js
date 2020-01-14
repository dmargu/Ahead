import React, { Component } from 'react';
import {
  DatePickerIOS,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import { colors } from '../../styles';

const HEIGHT = Dimensions.get('window').height;

class DatePickerModal extends Component {
  render() {
    return (
      <Modal
        transparent
        isVisible={this.props.isVisible}
        onBackdropPress={() => this.props.closeHandle()}
        animationIn='fadeIn'
        animationOut='fadeOut'
        backdropTransitionOutTiming={0}
        hasBackDrop
        backdropOpacity={0.9}
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerModalConfig}>
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
    borderColor: colors.mainDark,
    backgroundColor: colors.darkGrey,
    bottom: HEIGHT / 3,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  pickerModalConfig: {
    height: 200,
    width: 270,
    marginBottom: 35
  },
});

export default DatePickerModal;
