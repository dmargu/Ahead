import React, { Component } from 'react';
import { View, StyleSheet, Modal, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { closeDateModal } from '../../actions';
import IosDatePicker from '../common/IosDatePicker';
import AndroidDatePicker from '../common/AndroidDatePicker';

class DatePickerModal extends Component {
  render() {
    return (
      <Modal
        transparent
        animationType='fade'
        visible={this.props.dateModalVisible}
      >
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
              <View style={{ padding: 5 }}>
                <Feather
                  name="x-square"
                  size={35}
                  color={'#db5461'}
                  onPress={() => this.props.closeDateModal()}
                />
              </View>
            </View>
            <View style={{ padding: 5 }}>
              {Platform.OS === 'ios' ?
                <IosDatePicker item={this.props.item} /> : <AndroidDatePicker />
              }
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
    currItem: state.TodoReducer.currItem,
    dateModalVisible: state.ModalReducer.dateModalVisible
  };
}

export default connect(mapStateToProps, { closeDateModal })(DatePickerModal);
