import React from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const FullPicture = (props) => { //check create homework to see how it works with image picker
  return ( //this doesn't perfectly display the whole image
    <View style={styles.fullPicture}>
      <ImageZoom
        cropWidth={WIDTH}
        cropHeight={HEIGHT}
        imageHeight={HEIGHT}
        imageWidth={WIDTH}
        enableSwipeDown
        onSwipeDown={() => props.closeImage()}
      >
        <Image
          style={{ height: HEIGHT, width: WIDTH }}
          source={{ uri: props.picture.uri }}
        />
      </ImageZoom>
    </View>
  );
};

const styles = StyleSheet.create({
  fullPicture: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 10,
    height: '100%',
    width: '100%',
    position: 'absolute',
    right: 21
  }
});

export default FullPicture;
