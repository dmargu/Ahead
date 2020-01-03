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

const CustomButton = (props) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle,
        { borderColor: props.isItemActive ? '#28313b' : '#db5461',
        backgroundColor: props.isItemActive ? '#82ff9e' : null
      }]}
      onPress={props.onPress}
    >
      <Text
        style={{
        color: props.isItemActive ? '#28313b' : '#fcefef'
        }}
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
            <View style={{ justifyContent: 'space-between' }}>
              <Text>{item.testName}</Text>
              {item.className && <Text>{item.className}</Text>}
              <TouchableHighlight
                onPress={() => this.setState({ datePickerVisible: true })}
                underlayColor={null}
              >
                {item.date ?
                  <Text>
                    Test Date: {moment(item.date).format('MMM DD h:mm a')}
                  </Text>
                  : <Text>Set Test Date</Text>
                }
              </TouchableHighlight>
            </View>
            <View style={{ padding: 5 }}>
              <TextInput
                placeholder={'Add notes'}
                placeholderTextColor='#cdd2c9'
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
    borderColor: '#28313b',
    backgroundColor: '#555B6E'
  },
  remindersText: {
    fontSize: 20,
    color: '#db5461',
    fontWeight: 'bold',
    paddingBottom: 5
  },
  textStyle: {
    paddingTop: 15,
    paddingLeft: 15,
    fontSize: 18,
    color: '#fcefef'
  },
  setTime: {
    paddingTop: 10,
    paddingLeft: 15,
    fontSize: 18,
    color: '#db5461'
  },
  notesInput: {
    height: 130,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#cdd2c9',
    padding: 10,
    color: '#fcefef'
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
