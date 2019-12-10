import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import Modal from 'react-native-modal';

const HEIGHT = Dimensions.get('window').height;

class PictureModal extends Component {
  render() {
    return (
      <Modal
        animationType='slide'
        transparent
        visible={this.props.isVisible}
        onBackdropPress={() => this.props.modalCloseHandle()}
      >
        <View style={styles.pickerModal}>
          <View style={styles.pickerModalConfig}>
            <View style={{ padding: 5 }}>
              <Image source={{ uri: this.props.picture }} style={{ width: 200, height: 200 }} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  pickerModal: {
    position: 'absolute',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#28313b',
    backgroundColor: '#555B6E',
    bottom: HEIGHT / 3,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  pickerModalConfig: {
    height: 175,
    width: 215,
    marginBottom: 35
  },
  dateStyle: {
    color: '#db5461',
    fontSize: 20
  },
  clearDateButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#db5461'
  },
  clearDateText: {
    padding: 2,
    fontSize: 18
  }
});

export default PictureModal;
