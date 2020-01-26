import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import * as Calendar from 'expo-calendar';
import Modal from 'react-native-modal';
import { addIcalEvents, connectToIcal } from '../../actions';
import { colors, fonts } from '../../styles';

class ConnectModal extends Component {
  async connectToIcal() {
    //some if() the bool is false first, if true alert 'already connected to iCal!'
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      this.props.connectToIcal();
      this.props.addIcalEvents();
      //createAheadIcalFunction()
    } else {
      Alert.alert(
        'Cannot connect to iCal without permission.',
        null,
        [
          { text: 'OK' }
        ],
          { cancelable: false }
      );
    }
    this.props.closeHandle();
  }
  render() {
    return (
      <Modal
        animationIn='fadeIn'
        animationOut='fadeOut'
        backdropTransitionOutTiming={0}
        hasBackDrop
        backdropOpacity={0.9}
        transparent
        isVisible={this.props.isVisible}
        onBackdropPress={() => this.props.closeHandle()}
      >
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 80 }}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.connectToIcal.bind(this)}
                underlayColor={null}
              >
                <Text style={styles.text}>Connect To iCal</Text>
              </TouchableOpacity>

              {/*<TouchableOpacity
                style={styles.buttonContainer}
                //onPress={this.onButtonPress.bind(this)}
              >
                <Text style={styles.text}>Connect To gCal</Text>
              </TouchableOpacity>*/}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.mainDark,
    backgroundColor: colors.darkGrey
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    borderRadius: 30,
    backgroundColor: colors.mainRed
  },
  text: {
    color: colors.white,
    fontSize: fonts.buttonText,
    fontFamily: fonts.fontFamily
  }
});

export default connect(null, { addIcalEvents, connectToIcal })(ConnectModal);
