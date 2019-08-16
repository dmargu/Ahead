import React from 'react';
import { View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements';


const AddTodo = (props) => {
  return (
    <View>
    <ListItem
      containerStyle={styles.container}
      title={
        <TextInput
          style={styles.input}
          onChangeText={(textInput) => props.textChange(textInput)}
          value={props.textInput}
          autoCapitalize='sentences'
        />
      }
      titleStyle={{ color: '#FCEFEF', fontSize: 16 }}
      titleNumberOfLines={0}
      rightIcon={
        <TouchableHighlight
          underlayColor='#ed828d'
          onPress={props.addNewTodo}
        >
          <MaterialIcons
            name='add-box'
            size={35}
            color='#82ff9e'
          />
        </TouchableHighlight>
      }
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderBottomColor: '#DDD',
    borderTopColor: '#DDD',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingLeft: 15,
    backgroundColor: null
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 35,
    color: '#FCEFEF'
  }
});

export default AddTodo;
