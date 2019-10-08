import React from 'react';
import { View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements';


const AddTodo = React.forwardRef((props, ref) => {
  return (
    <View>
    <ListItem
      containerStyle={styles.container}
      title={
        <TextInput
          style={styles.input}
          //onChangeText={(textInput) => props.textChange(textInput)}
          onChangeText={(textInput) => textChangeHandle(textInput, props)}
          value={props.textInput}
          autoCapitalize='sentences'
          placeholder='I want to...'
          placeholderTextColor='#cdd2c9'
          ref={ref}
        />
      }
      titleStyle={{ color: '#cdd2c9', fontSize: 16 }}
      titleNumberOfLines={0}
      rightIcon={
        <TouchableHighlight
          underlayColor='#ed828d'
          onPress={props.addNewTodo}
        >
          <MaterialIcons
            name={props.textInput ? 'add-box' : 'add'}
            size={35}
            color={'#82ff9e'}
          />
        </TouchableHighlight>
      }
    />
    </View>
  );
});

function textChangeHandle(textInput, props) {
  const goodInput = textInput.trimLeft();
  return (
    props.textChange(goodInput)
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    shadowColor: 'black',
    borderBottomWidth: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingLeft: 15,
    backgroundColor: '#28313b'
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 35,
    color: '#cdd2c9'
  }
});

export default AddTodo;
