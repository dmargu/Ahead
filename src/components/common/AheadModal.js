import React from 'react';
import { View, Modal, Dimensions, Platform } from 'react-native';

const SCREEN = Dimensions.get('window');

const AheadModal = ({ visible }) => {
  return (
    <Modal
    transparent
    animationType='fade'
    onRequestClose={() => {}}
    visible={visible}
    style={styles.containerStyle}
    />
  );
};

const styles = {
  containerStyle: {
    justifyContent: 'center',
    borderRadius: Platform.OS === 'ios' ? 30 : 0,
    width: SCREEN.width * 0.8
  }
};

export default AheadModal;
