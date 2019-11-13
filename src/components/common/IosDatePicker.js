import React, { Component } from 'react';
import { DatePickerIOS } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { changeDate } from '../../actions';

class IosDatePicker extends Component {
  render() {
    const item = this.props.item;
    return (
      <DatePickerIOS
        date={item.date ? moment(item.date).toDate() : new Date()}
        onDateChange={(date) => this.props.changeDate(date, item.id)}
        minuteInterval={5}
        minimumDate={new Date()}
      />
    );
  }
}

export default connect(null, { changeDate })(IosDatePicker);
