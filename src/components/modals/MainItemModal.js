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
import ImagePickerAndList from '../ImagePickerAndList';
import FullPicture from '../FullPicture';
import { toggleItemModal, toggleItemModalDatePicker, notesChanged, addPicture } from '../../actions';
import { colors, fonts } from '../../styles';

class MainItemModal extends Component {
  constructor() {
    super();
    this.state = {
      datePickerVisible: false,
      fullPictureVisible: false,
      selectedPicture: null,
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
        {this.state.fullPictureVisible && //not working right
            <FullPicture
              picture={this.state.selectedPicture}
              closeImage={() => this.setState({ fullPictureVisible: false })}
            />
        }
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
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
            <ImagePickerAndList
              pictures={item.pictures}
              addPicture={(newArr) => this.props.addPicture(newArr, item)}
              fullPictureVisible={this.state.fullPictureVisible}
              fullPictureOpenHandle={(picture) => {
                this.setState({ fullPictureVisible: true });
                this.setState({ selectedPicture: picture });
              }}
            />
            {item.date && <View style={styles.containerStyle}>
              <Text style={styles.remindersText}>Reminders</Text>
            </View>}
            {item.date && <View style={{ paddingBottom: 40 }}>
              <ReminderToggleButtons item={item} />
            </View>}
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
    width: '100%',
    //height: 270,
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
    paddingTop: 5,
    fontSize: fonts.normalText,
    color: colors.white,
    fontFamily: fonts.fontFamily,
    fontWeight: 'bold'
  },
  setTime: {
    paddingTop: 5,
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

export default connect(null, {
  toggleItemModal,
  toggleItemModalDatePicker,
  notesChanged,
  addPicture
})(MainItemModal);
