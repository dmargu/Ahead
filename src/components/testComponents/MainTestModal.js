import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import moment from 'moment';
import MainItemDatePickerModal from '../modals/MainItemDatePickerModal';
import ImagePickerAndList from '../ImagePickerAndList';
import FullPicture from '../FullPicture';
import {
  toggleItemModal,
  toggleItemModalDatePicker,
  notesChanged,
  addPicture,
  toggleItemStudyDay
} from '../../actions';
import { colors, fonts } from '../../styles';


const CustomButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle,
        { borderColor: props.isItemActive ? colors.darkGrey : colors.mainRed,
        backgroundColor: props.isItemActive ? colors.green : null
      }]}
      onPress={props.onPress}
    >
      <Text
        style={[styles.textStyle, {
        color: props.isItemActive ? colors.darkGrey : colors.mainRed
        }]}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const SetDateFirst = () => {
  return (
    Alert.alert(
      'Set A Date First.',
      null,
      [
        { text: 'OK' }
      ],
        { cancelable: false }
    )
  );
};

class MainTestModal extends Component {
  constructor() {
    super();
    this.state = {
      fullPictureVisible: false,
      selectedPicture: null,
      datePickerVisible: false
    };
  }
  render() {
    const item = this.props.item;
    return (
      <Modal
        animationType='fade'
        transparent
        visible={this.props.isVisible}
        onBackdropPress={() => this.props.closeHandle()}
      >
        {this.state.fullPictureVisible && //not working right
            <FullPicture
              picture={this.state.selectedPicture}
              closeImage={() => this.setState({ fullPictureVisible: false })}
            />
        }
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={styles.title}>{item.testName}</Text>
              {item.className && <Text style={styles.textStyle}>{item.className}</Text>}
              <TouchableHighlight
                onPress={() => this.setState({ datePickerVisible: true })}
                underlayColor={null}
              >
                {item.date ?
                  <Text style={styles.setTime}>
                    Test Date: {moment(item.date).format('MMM DD h:mm a')}
                  </Text>
                  : <Text style={styles.setTime}>Set Test Date</Text>
                }
              </TouchableHighlight>
            </View>
            <View style={{ padding: 5 }}>
              <TextInput
                placeholder={'Add notes'}
                placeholderTextColor={colors.mainLightText}
                value={item.notes}
                multiline
                style={styles.notesInput}
                onChangeText={(text) => this.props.notesChanged(text, item)}
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

            <View style={styles.container}>
              <Text style={styles.remindersText}>Put in my day to study:</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <CustomButton
                text={'1 Day Before'}
                onPress={() => {
                  if (item.date) {
                    this.props.toggleItemStudyDay(item, 'one');
                  } else {
                    SetDateFirst();
                  }
                }}
                isItemActive={item.oneDayStudy}
              />
              <CustomButton
                text={'2 Days Before'}
                onPress={() => {
                  if (item.date) {
                    this.props.toggleItemStudyDay(item, 'two');
                  } else {
                    SetDateFirst();
                  }
                }}
                isItemActive={item.twoDayStudy}
              />

              <CustomButton
                text={'3 Days Before'}
                onPress={() => {
                  if (item.date) {
                    this.props.toggleItemStudyDay(item, 'three');
                  } else {
                    SetDateFirst();
                  }
                }}
                isItemActive={item.threeDayStudy}
              />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <CustomButton
              text={'4 Days Before'}
              onPress={() => {
                if (item.date) {
                  this.props.toggleItemStudyDay(item, 'four');
                } else {
                  SetDateFirst();
                }
              }}
              isItemActive={item.fourDayStudy}
            />
            <CustomButton
              text={'5 Days Before'}
              onPress={() => {
                if (item.date) {
                  this.props.toggleItemStudyDay(item, 'five');
                } else {
                  SetDateFirst();
                }
              }}
              isItemActive={item.fiveDayStudy}
            />

            <CustomButton
              text={'6 Days Before'}
              onPress={() => {
                if (item.date) {
                  this.props.toggleItemStudyDay(item, 'six');
                } else {
                  SetDateFirst();
                }
              }}
              isItemActive={item.sixDayStudy}
            />
          </View>

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
  container: {
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
    fontFamily: fonts.fontFamily,
    color: colors.mainRed,
    fontWeight: 'bold',
    paddingBottom: 5
  },
  textStyle: {
    fontSize: fonts.normalText,
    color: colors.white,
    fontFamily: fonts.fontFamily
  },
  title: {
    fontSize: fonts.headerText,
    fontFamily: fonts.fontFamily,
    fontWeight: 'bold',
    color: colors.white,
  },
  setTime: {
    paddingLeft: 5,
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
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    padding: 5,
  },
});

export default connect(null, {
  toggleItemModal,
  toggleItemModalDatePicker,
  notesChanged,
  addPicture,
  toggleItemStudyDay
})(MainTestModal);
