import React, { Component } from 'react';
import { View, StyleSheet, Modal, Platform, TextInput, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { closeItemModal } from '../../actions';
import CardSection from '../common/CardSection';
import DatePickerIOS from '../common/DatePickerIOS';

class ItemInformationModal extends Component {
  render() {
    return (
      <Modal
        transparent
        animationType='fade'
        visible={this.props.itemModalVisible}
      >
        <View style={styles.containerStyle}>
          <View style={{ height: 300, width: '75%' }}>
            <CardSection>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                  { this.props.currItem.text ?
                    <Text>{this.props.currItem.text}</Text>
                    : <TextInput placeholder='Event Title' multiline style={styles.titleInput} />
                  }
                  <DatePickerIOS />
                </View>
                <Button
                  title='X'
                  onPress={() => this.props.closeItemModal()}
                />
              </View>
              <TextInput
                placeholder='Add notes'
                multiline
                style={styles.notesInput}
              />
              <Button
                title='Add Reminder'
              />
            </CardSection>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Platform.OS === 'ios' ? 30 : 0,
    shadowRadius: 10,
    flex: 1,
    position: 'relative',
  },
  titleInput: {
    maxHeight: 40,
    padding: 10,
  },
  notesInput: {
    height: 100,
    borderWidth: 1,
    padding: 10
  }
});

function mapStateToProps(state) {
  return {
    itemModalVisible: state.ModalReducer.itemModalVisible,
    todos: state.TodoReducer.todos,
    currItem: state.TodoReducer.currItem
  };
}

export default connect(mapStateToProps, { closeItemModal })(ItemInformationModal);
