import React, { Component } from 'react';
import {
  DatePickerIOS,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal
} from 'react-native';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { changeDate } from '../../actions/TodoActions';

class IosDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false
    };
  }

  render() {
    const showDatePicker = this.state.showDatePicker ?
      (<Modal
        visible={this.state.showDatePicker}
        animationType='slide'
        transparent
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerModalConfig}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
              <Feather
                name="x-circle"
                size={35}
                color={'#ff4040'}
                onPress={() => this.setState({ showDatePicker: !this.state.showDatePicker })}
              />
            </View>
            <DatePickerIOS
              date={this.props.date ? this.props.date : new Date()}
              onDateChange={(date) => this.props.changeDate(date)}
              minuteInterval={5}
              minimumDate={new Date()}
            />
          </View>
        </View>
      </Modal>)
      : <View />;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.setState({ showDatePicker: !this.state.showDatePicker })}
        >
          {(this.props.date) ?
            <Text>{moment(this.props.date).format('MMM DD h:mm a')}</Text>
            : <Text>Set Time</Text>}
        </TouchableOpacity>
        {showDatePicker}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
  pickerModal: {
    position: 'absolute',
    borderRadius: 30,
    backgroundColor: 'white',
    bottom: 75,
    justifyContent: 'center',
  },
  pickerModalConfig: {
    height: 200,
    width: 350,
    marginBottom: 35
  }
});

function mapStateToProps(state) {
  return {
    date: state.TodoReducer.todos[state.TodoReducer.currItem.id].date
  };
}

export default connect(mapStateToProps, { changeDate })(IosDatePicker);
