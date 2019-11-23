import React, { Component } from 'react';
import { View, StyleSheet, Modal, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { toggleNotesModal, notesChanged } from '../../actions';

class NotesModal extends Component { //right now I don't know how to reschedule notifications after cancelling
  onNotesChange(text) { //the async functions to do that with expo take like a second so it's too much of a
    this.props.notesChanged(text, this.props.item); //process to do that now didn't work on change date
  } //something to fix with the future so for now notifications will send with old notes unless cancelled
  render() {
    const item = this.props.item;
    return (
      <Modal transparent animationType='fade'>
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
              <View style={{ padding: 5 }}>
                <Feather
                  name="x-square"
                  size={35}
                  color={'#db5461'}
                  onPress={() => this.props.toggleNotesModal(item)}
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
          </View>
        </View>
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
    width: '75%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#28313b',
    backgroundColor: '#555B6E',
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

export default connect(null, { toggleNotesModal, notesChanged })(NotesModal);
