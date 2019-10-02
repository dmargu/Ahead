import React, { Component } from 'react';
import { DatePickerIOS } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { changeDate } from '../../actions';

class IosDatePicker extends Component {
  render() {
    console.log(this.props.item);
    return (
      <DatePickerIOS
        date={this.props.item.date ? moment(this.props.item.date).toDate() : new Date()}
        onDateChange={(date) => this.props.changeDate(date, this.props.currItem.id)}
        minuteInterval={5}
        minimumDate={new Date()}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    currItem: state.TodoReducer.currItem
  };
}

export default connect(mapStateToProps, { changeDate })(IosDatePicker);
