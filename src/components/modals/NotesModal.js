import React, { Component } from 'react';
import { View, StyleSheet, Modal, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { closeNotesModal, notesChanged } from '../../actions';

class NotesModal extends Component {
  onNotesChange(text) {
    this.props.notesChanged(text, this.props.currItem.id);
  }

  render() {
    return (
      <Modal
        transparent
        animationType='fade'
        visible={this.props.notesModalVisible}
      >
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
              <View style={{ padding: 5 }}>
                <Feather
                  name="x-square"
                  size={35}
                  color={'#db5461'}
                  onPress={() => this.props.closeNotesModal()}
                />
              </View>
            </View>
            <View style={{ padding: 5 }}>
              <TextInput
                placeholder={'Add notes'}
                placeholderTextColor='#cdd2c9'
                value={this.props.currItem.notes}
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
    backgroundColor: '#28313b',
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

function mapStateToProps(state) {
  return {
    notesModalVisible: state.ModalReducer.notesModalVisible,
    currItem: state.TodoReducer.currItem
  };
}

export default connect(mapStateToProps, { closeNotesModal, notesChanged })(NotesModal);
