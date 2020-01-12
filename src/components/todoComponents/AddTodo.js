import React from 'react';
import { View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements';
import { colors, fonts } from '../../styles';


const AddTodo = React.forwardRef((props, ref) => {
  return (
    <View>
      <ListItem
        containerStyle={styles.container}
        title={
          <TextInput
            style={styles.input}
            onChangeText={(textInput) => textChangeHandle(textInput, props)}
            value={props.textInput}
            autoCapitalize='sentences'
            placeholder='I want to...'
            placeholderTextColor={colors.mainLightText}
            ref={ref}
            onSubmitEditing={props.onSubmitEditing}
          />
        }
        titleNumberOfLines={0}
        rightIcon={
          <TouchableHighlight
            underlayColor={colors.mainRed}
            onPress={props.addNewTodo}
          >
            <MaterialIcons
              name={props.textInput ? 'add-box' : 'add'}
              size={35}
              color={colors.green}
            />
          </TouchableHighlight>
        }
      />
    </View>
  );
});

function textChangeHandle(textInput, props) {
  const goodInput = textInput.trimLeft(); //cuts off if space is first character (no input w/out character)
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
    shadowOpacity: 0.5,
    shadowRadius: 2,
    paddingLeft: 15,
    backgroundColor: colors.darkGrey,
    flexGrow: 1
  },
  input: {
    flex: 1,
    fontSize: fonts.normalText,
    height: 35,
    color: colors.white,
    fontFamily: fonts.fontFamily
  },
});

export default AddTodo;
