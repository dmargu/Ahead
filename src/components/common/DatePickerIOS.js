import React, { Component } from 'react';
import {
  DatePickerIOS,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { changeDate } from '../../actions/TodoActions';
import AndroidDatePicker from './AndroidDatePicker';

class IosDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false,
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
                name="x-square"
                size={35}
                color={'#db5461'}
                onPress={() => this.setState({ showDatePicker: !this.state.showDatePicker })}
              />
            </View>
            <View style={{ padding: 5 }}>
              {Platform.OS === 'ios' ?
                <DatePickerIOS
                  date={this.props.date ? this.props.date : new Date()}
                  onDateChange={(date) => this.props.changeDate(date)}
                  minuteInterval={5}
                  minimumDate={new Date()}
                />
                :
                <AndroidDatePicker />
              }
            </View>
          </View>
        </View>
      </Modal>)
      : <View />;
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ showDatePicker: !this.state.showDatePicker })}
        >
          {(this.props.date) ?
            <Text style={styles.dateStyle}>{
              moment(this.props.date).format('MMM DD h:mm a')}
            </Text>
            : <Text style={styles.dateStyle}>Set Time</Text>}
        </TouchableOpacity>
        {showDatePicker}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickerModal: {
    position: 'absolute',
    borderRadius: 15,
    backgroundColor: '#cdd2c9',
    bottom: 60,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  pickerModalConfig: {
    height: 220,
    width: 315,
    marginBottom: 35
  },
  dateStyle: {
    color: '#db5461',
    fontSize: 20
  }
});

function mapStateToProps(state) {
  return {
    date: state.TodoReducer.todos[state.TodoReducer.currItem.id].date
  };
}

export default connect(mapStateToProps, { changeDate })(IosDatePicker);
