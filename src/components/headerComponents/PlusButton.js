import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { openPlusModal } from '../../actions';
import AddEventModal from '../modals/AddEventModal';

class PlusButton extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity>
          <Ionicons
            name='md-add'
            size={32}
            onPress={() => this.props.openPlusModal()}
            color='#f5f5f5'
          />
        </TouchableOpacity>
        <AddEventModal />
      </View>
    );
  }
}

function mapStateToProps({ ModalReducer }) {
  return { ModalReducer };
}

export default connect(mapStateToProps, { openPlusModal })(PlusButton);
