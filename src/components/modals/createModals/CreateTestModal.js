import React, { Component } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Feather } from '@expo/vector-icons';
import { toggleCreateTestModal } from '../../../actions';

const validationSchema = yup.object().shape({
  testName: yup.string().required('C\'mon, how do you forget the name.')
});

class CreateTestModal extends Component {
  render() {
    return (
      <Modal transparent animationType='fade' visible={this.props.createTestModalVisible}>
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <View style={{ padding: 10 }}>
                <Text style={styles.modalTitle}>Create A Test</Text>
              </View>
              <View style={{ padding: 5 }}>
                <Feather
                  name="x-square"
                  size={35}
                  color={'#db5461'}
                  onPress={() => this.props.toggleCreateTestModal()}
                />
              </View>
            </View>
            <Formik
              initialValues={{ testName: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                console.log(values);
                setTimeout(() => {
                  actions.setSubmitting(false);
                }, 1000);
              }}
            >
              {formikProps => (
                <View>
                  <View style={styles.inputView}>
                    <View style={styles.inputBorder}>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={formikProps.handleChange('testName')}
                        autoCapitalize='sentences'
                        placeholder='Test Name'
                        placeholderTextColor='#fcefef'
                      />
                    </View>
                  </View>
                  <Text style={styles.textError}>{formikProps.errors.testName}</Text>
                  {formikProps.isSubmitting ? (
                    <ActivityIndicator />
                  )
                  : (
                    <Button title={'Create'} onPress={formikProps.handleSubmit} />
                  )}
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: 360,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#28313b',
    backgroundColor: '#555B6E'
  },
  modalTitle: {
    fontSize: 18,
    color: '#fcefef',
    fontWeight: 'bold'
  },
  inputView: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputBorder: {
    borderBottomWidth: 1,
    borderColor: '#28313b',
    left: 5,
    width: 250
  },
  textInput: {
    fontSize: 16,
    height: 35,
    width: 250,
    color: '#fcefef',
  },
  textError: {
    color: '#db5461',
    left: 8
  }
});

function mapStateToProps(state) {
  return {
    createTestModalVisible: state.ModalReducer.createTestModalVisible
  };
}

export default connect(mapStateToProps, { toggleCreateTestModal })(CreateTestModal);
