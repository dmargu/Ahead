import React, { Component } from 'react';
import { DatePickerIOS } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { changeDate, cancelAllNotifications } from '../../actions';
import { scheduleNotification } from '../../functions/ScheduleNotification';

class IosDatePicker extends Component {
  onDateChangeHandle(date) {
    //this.props.cancelAllNotifications(this.props.item);
    this.props.changeDate(date, this.props.item.id);
    /*if (this.props.item.startReminder) {
      scheduleNotification.startReminder(this.props.item);
    }
    if (this.props.item.tenMinReminder) {
      scheduleNotification.tenMinReminder(this.props.item);
    }
    if (this.props.item.thirtyMinReminder) {
      scheduleNotification.thirtyMinReminder(this.props.item);
    }
    if (this.props.oneHourReminder) {
      scheduleNotification.oneHourReminder(this.props.item);
    }
    if (this.props.oneDayReminder) {
      scheduleNotification.oneDayReminder(this.props.item);
    }*/
  }
  render() {
    const item = this.props.item;
    return (
      <DatePickerIOS
        date={item.date ? moment(item.date).toDate() : new Date()}
        onDateChange={this.onDateChangeHandle.bind(this)}
        minuteInterval={5}
        minimumDate={new Date()}
      />
    );
  }
}

export default connect(null, { changeDate, cancelAllNotifications })(IosDatePicker);
