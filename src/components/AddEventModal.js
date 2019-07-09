import React from 'react';
import { View, Text, StyleSheet, Modal, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import CardSection from './common/CardSection';

const AddEventModal = ({ isVisible }) => {
  return (
    <Modal
    transparent
    animationType='fade'
    onRequestClose={() => {}}
    visible={isVisible}
    >
      <View style={styles.containerStyle}>
        <CardSection style={styles.CardSection}>
          <View style={styles.headerStyle}>
            <Text>Create...</Text>
            <Button onPress={() => {}} />
          </View>
          <View style={styles.buttons}>
            <Button title='Todo' />
            <Button title='Homework Assignment' />
            <Button title='Test' />
          </View>
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Platform.OS === 'ios' ? 30 : 0,
    shadowRadius: 10,
    flex: 1,
    position: 'relative',
  },
  CardSection: {
    flex: 1,
    justifyContent: 'center',
  },
  headerStyle: {
    flexDirection: 'row'
  },
  buttons: {
    flexDirection: 'column'
  }
});


export default AddEventModal;
