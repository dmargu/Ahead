import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import moment from 'moment';
import MainItemDatePickerModal from './MainItemDatePickerModal';
import ReminderToggleButtons from '../ReminderToggleButtons';
import { toggleItemModal, toggleItemModalDatePicker, notesChanged } from '../../actions';
import { colors, fonts } from '../../styles';

class MainItemModal extends Component {
  constructor() {
    super();
    this.state = {
      datePickerVisible: false
    };
  }
  onNotesChange(text) { //again this doesn't reset notifications.
    this.props.notesChanged(text, this.props.item);
  }
  render() {
    const item = this.props.item;
    return (
      <Modal
        transparent
        animationIn='fadeIn'
        animationOut='fadeOut'
        backdropTransitionOutTiming={0} //need this to prevent flicker
        isVisible
        hasBackDrop
        backdropOpacity={0.9}
        onBackdropPress={() => this.props.toggleItemModal(item)}
      >
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text style={styles.textStyle}>{item.text}</Text>
                <TouchableHighlight
                  onPress={() => this.setState({ datePickerVisible: true })}
                  underlayColor={null}
                >
                  <Text style={styles.setTime}>
                    {item.date
                      ? moment(item.date).format('MMM DD h:mm a')
                      : 'Set Time'
                    }
                  </Text>
                </TouchableHighlight>
              </View>
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
            {item.date && <View style={styles.containerStyle}>
              <Text style={styles.remindersText}>Reminders</Text>
            </View>}
            {item.date && <ReminderToggleButtons item={item} />}
          </View>
        </View>
        <MainItemDatePickerModal
          item={item}
          isVisible={this.state.datePickerVisible}
          closeHandle={() => this.setState({ datePickerVisible: false })}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.mainDark,
    backgroundColor: colors.darkGrey
  },
  remindersText: {
    fontSize: fonts.headerText,
    color: colors.mainRed,
    fontWeight: 'bold',
    fontFamily: fonts.fontFamily,
    paddingBottom: 5
  },
  textStyle: {
    paddingTop: 15,
    paddingLeft: 15,
    fontSize: fonts.normalText,
    color: colors.white,
    fontFamily: fonts.fontFamily
  },
  setTime: {
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: fonts.normalText,
    color: colors.mainRed,
    fontFamily: fonts.fontFamily
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

export default connect(null, { toggleItemModal, toggleItemModalDatePicker, notesChanged })(MainItemModal);
