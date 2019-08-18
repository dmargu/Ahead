import React, { Component } from 'react';
import { View, StyleSheet, Modal, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { closeItemModal, notesChanged } from '../../actions';
import DatePickerIOS from '../common/DatePickerIOS';

class ItemInformationModal extends Component {
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text style={styles.itemTitle}>{this.props.currItem.text}</Text>
                <View style={{ paddingLeft: 5 }}>
                  <DatePickerIOS />
                </View>
              </View>
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
  itemTitle: {
    fontSize: 20,
    color: '#28313b',
    padding: 10
  }
});

function mapStateToProps(state) {
  return {
    itemModalVisible: state.ModalReducer.itemModalVisible,
    todos: state.TodoReducer.todos,
    currItem: state.TodoReducer.currItem,
  };
}

export default connect(mapStateToProps, { closeItemModal, notesChanged })(ItemInformationModal);
