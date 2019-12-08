import React from 'react';
import { View, Platform, Alert, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

async function selectImages(props) {
  const status = await getCameraPermission();
  if (status === 'granted') {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.cancelled) {
      props.pictures.push(result);
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
      props.pictures.push(result);
    }
  }
}

async function getCameraPermission() {
  if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL && Permissions.CAMERA);
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
          onPress={() => selectImages(props)}
        />
      </View>

      <FlatList
        data={props.pictures}
        extraData={props.pictures}
        horizontal
        keyExtractor={picture => picture.uri} //no idea if this is a good practice or not
        renderItem={({ picture }) => {
          console.log(picture);
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={{ uri: picture }} style={{ width: 100, height: 100 }} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default ImagePickerAndList;
