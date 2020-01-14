import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { toggleNotesModal, notesChanged } from '../../actions';
import { colors, fonts, dimensions } from '../../styles';

class NotesModal extends Component { //right now I don't know how to reschedule notifications after cancelling
  onNotesChange(text) { //the async functions to do that with expo take like a second so it's too much of a
    this.props.notesChanged(text, this.props.item); //process to do that now didn't work on change date
  } //something to fix with the future so for now notifications will send with old notes unless cancelled
  render() {
    const item = this.props.item;
    return (
      <Modal
        transparent
        animationType='fade'
        onBackdropPress={() => this.props.toggleNotesModal(item)}
        backdropTransitionOutTiming={0} //need this to prevent flicker
        hasBackDrop
        backdropOpacity={0.9}
        isVisible
      >
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.textStyle}>{item.text}</Text>
            </View>
            <View style={{ padding: 5 }}>
              <TextInput
                placeholder={'Add notes'}
                placeholderTextColor={colors.mainLightText}
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
    position: 'absolute',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.mainDark,
    backgroundColor: colors.darkGrey,
    bottom: dimensions.height / 3,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  modalContainer: {
    height: 125,
    width: 315,
    marginBottom: 35
  },
  textStyle: {
    paddingTop: 5,
    fontSize: fonts.normalText,
    color: colors.white,
    fontFamily: fonts.fontFamily,
    fontWeight: 'bold'
  },
  notesInput: {
    height: 130,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.mainLightText,
    padding: 10,
    color: colors.white,
    fontSize: fonts.normalText,
    fontFamily: fonts.fontFamily
  },
});

export default connect(null, { toggleNotesModal, notesChanged })(NotesModal);
