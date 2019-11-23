import React, { Component } from 'react';
import { DatePickerIOS } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { changeDate, cancelAllNotifications, addNotificationID } from '../../actions';

class IosDatePicker extends Component {
  async onDateChangeHandle(date) {
    await this.props.cancelAllNotifications(this.props.item);
    await this.props.changeDate(date, this.props.item.id);
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

export default connect(null, { changeDate, cancelAllNotifications, addNotificationID })(IosDatePicker);
