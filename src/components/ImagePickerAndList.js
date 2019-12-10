import React from 'react';
import { View, Platform, Alert, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import PictureModal from './modals/PictureModal';

async function selectImage(props) {
  const status = await getCameraRollPermission();
  if (status === 'granted') {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      const newArr = props.pictures.concat(result.uri);
      props.addPicture(newArr);
    }
  }
}

async function openCamera(props) {
  const status = await getCameraPermission();
  if (status === 'granted') {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.cancelled) {
      const newArr = props.pictures.concat(result.uri);
      props.addPicture(newArr);
    }
  }
}

async function getCameraRollPermission() {
  if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert(
          'Sorry, we need camera roll permissions to make this work!',
          null,
          [
            { text: 'OK' }
          ],
            { cancelable: false }
          );
      }
      return status;
  }
}

async function getCameraPermission() {
  if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        Alert.alert(
          'Sorry, we need camera permissions to make this work!',
          null,
          [
            { text: 'OK' }
          ],
            { cancelable: false }
          );
      }
      return status;
  }
}

const ImagePickerAndList = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ left: 5 }}>
        <Ionicons
          name='ios-camera'
          size={40}
          color={'#cdd2c9'}
          onPress={() => openCamera(props)}
        />
        <Ionicons
          name='ios-images'
          size={40}
          color={'#cdd2c9'}
          onPress={() => selectImage(props)}
        />
      </View>

      <View style={{ left: 15, flex: 1 }}>
        <FlatList
          data={props.pictures}
          extraData={props.pictures}
          horizontal
          keyExtractor={picture => picture} //maybe change to arrays index in future
          renderItem={({ item }) => {
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback onPress={() => props.modalOpenHandle()}>
                  <Image source={{ uri: item }} style={{ width: 75, height: 75 }} />
                </TouchableWithoutFeedback>

                <PictureModal
                  isVisible={props.pictureModalVisible}
                  modalCloseHandle={props.modalCloseHandle}
                  picture={item}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ImagePickerAndList;
