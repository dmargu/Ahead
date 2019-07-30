import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const AddTodo = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(textInput) => props.textChange(textInput)}
        value={props.textInput}
        autoCapitalize='sentences'
      />
      <TouchableOpacity style={styles.addButton} onPress={props.addNewTodo}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderBottomColor: '#DDD',
    borderTopColor: '#DDD',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15
  },
  input: {
    flex: 1,
    fontSize: 18,
    height: 35,
    color: 'white'
  },
  addButton: {
    width: 100,
    height: 35,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#171717',
    fontSize: 18,
    fontWeight: '700'
  }
});

export default AddTodo;
