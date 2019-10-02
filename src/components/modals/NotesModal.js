import React, { Component } from 'react';
import { View, StyleSheet, Modal, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { closeItemModal, notesChanged } from '../../actions';

class NotesModal extends Component {
  onNotesChange(text) {
    this.props.notesChanged(text);
  }

  render() {
    return (
      <Modal
        transparent
        animationType='fade'
        visible={this.props.itemModalVisible}
      >
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'flex-end' }}>
              <View style={{ padding: 5 }}>
                <Feather
                  name="x-square"
                  size={35}
                  color={'#db5461'}
                  onPress={() => this.props.closeItemModal()}
                />
              </View>
            </View>
            <View style={{ padding: 5 }}>
              <TextInput
                placeholder={'Add notes'}
                value={this.props.item.notes}
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
    borderColor: '#cdd2c9',
    backgroundColor: '#cdd2c9',
  },
  notesInput: {
    height: 130,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#28313b',
    padding: 10,
    color: '#28313b'
  },
});

function mapStateToProps(state) {
  return {
    itemModalVisible: state.ModalReducer.itemModalVisible,
    todos: state.TodoReducer.todos,
  };
}

export default connect(mapStateToProps, { closeItemModal, notesChanged })(NotesModal);
