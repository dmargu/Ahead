import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
);

const styles = {
    containerStyle: {
      padding: 5,
      backgroundColor: 'grey',
      borderColor: '#838587',
      position: 'relative',
    }
};

export default CardSection;
