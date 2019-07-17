import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions';
import CardSection from './common/CardSection';

class AddEventModal extends Component {
  render() {
    return (
      <Modal
      transparent
      animationType='fade'
      onRequestClose={() => {}}
      visible={this.props.ModalReducer.modalVisible}
      >
        <View style={styles.containerStyle}>
          <CardSection style={styles.CardSection}>
            <View style={styles.modalContent}>
              <View style={styles.headerStyle}>
                  <Text style={styles.createStyle}>Create...</Text>
                <Button
                style={styles.exitStyle}
                title='X'
                onPress={() => this.props.closeModal()}
                />
              </View>
              <Button title='Todo' style={styles.buttons} />
              <Button title='Homework Assignment' style={styles.buttons} />
              <Button title='Test' style={styles.buttons} />
            </View>
          </CardSection>
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
  CardSection: {
    flex: 1,
    justifyContent: 'center',
  },
  headerStyle: {
    flexDirection: 'row'
  },
  modalContent: {
    flexDirection: 'column'
  },
  createStyle: {
    justifyContent: 'center', //this shouldn't be hardcoded to center
    fontSize: 20,
    start: 70
  },
  exitStyle: {
    start: 100, //this shouldn't be hardcoded to right
  },
  buttons: {
    paddingTop: 10
  }
});

function mapStateToProps({ ModalReducer }) {
  return { ModalReducer };
}

export default connect(mapStateToProps, { openModal, closeModal })(AddEventModal);
