import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableHighlight,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import ReminderToggleButtons from '../ReminderToggleButtons';
import MainItemDatePickerModal from './MainItemDatePickerModal';
import { toggleItemModal, toggleItemModalDatePicker, notesChanged } from '../../actions';

class MainItemModal extends Component {
  onNotesChange(text) { //again this doesn't reset notifications.
    this.props.notesChanged(text, this.props.item);
  }
  render() {
    const item = this.props.item;
    return (
      <Modal transparent animationType='fade'>
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text style={styles.textStyle}>{item.text}</Text>
                <TouchableHighlight
                  onPress={() => this.props.toggleItemModalDatePicker(item)}
                  underlayColor={null}
                >
                  <Text style={styles.setTime}>
                    {item.date
                      ? moment(item.date).format('MMM DD h:mm a')
                      : 'Set Time'
                    }
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={{ paddingTop: 5, paddingRight: 8 }}>
                <Feather
                  name="x-square"
                  size={35}
                  color={'#db5461'}
                  onPress={() => this.props.toggleItemModal(item)}
                />
              </View>
            </View>
            <View style={{ padding: 5 }}>
              <TextInput
                placeholder={'Add notes'}
                placeholderTextColor='#cdd2c9'
                value={item.notes}
                multiline
                style={styles.notesInput}
                onChangeText={this.onNotesChange.bind(this)}
              />
            </View>
            <View style={styles.containerStyle}>
              <Text style={styles.remindersText}>Reminders</Text>
              <ReminderToggleButtons item={item} />
            </View>
          </View>
        </View>
        {item.itemModalDatePickerVisible ?
          <MainItemDatePickerModal item={item} /> : <View />
        }
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#28313b',
    backgroundColor: '#555B6E'
  },
  remindersText: {
    fontSize: 20,
    color: '#db5461',
    fontWeight: 'bold',
    paddingBottom: 5
  },
  textStyle: {
    paddingTop: 15,
    paddingLeft: 15,
    fontSize: 18,
    color: '#fcefef'
  },
  setTime: {
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: 18,
    color: '#db5461'
  },
  notesInput: {
    height: 130,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#cdd2c9',
    padding: 10,
    color: '#fcefef'
  },
});

export default connect(null, { toggleItemModal, toggleItemModalDatePicker, notesChanged })(MainItemModal);
