import React, { Component } from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { toggleCreateHomeworkModal } from '../../../actions';

class CreateClassModal extends Component {
  render() {
    return (
      <Modal transparent animationType='fade' visible={this.props.createHomeworkModalVisible}>
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <View style={{ padding: 10 }}>
                <Text style={styles.modalTitle}>Create Homework</Text>
              </View>
              <View style={{ padding: 5 }}>
                <Feather
                  name="x-square"
                  size={35}
                  color={'#db5461'}
                  onPress={() => this.props.toggleCreateHomeworkModal()}
                />
              </View>
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
    width: '90%',
    height: 360,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#28313b',
    backgroundColor: '#555B6E'
  },
  modalTitle: {
    fontSize: 18,
    color: '#fcefef',
    fontWeight: 'bold'
  }
});

function mapStateToProps(state) {
  return {
    createHomeworkModalVisible: state.ModalReducer.createHomeworkModalVisible
  };
}

export default connect(mapStateToProps, { toggleCreateHomeworkModal })(CreateClassModal);
