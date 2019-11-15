import {
  TOGGLE_DATE_MODAL
} from '../actions/types';


const initialState = {
  dateModalVisible: false
};

export default (state = initialState, action) => {
  switch (action.type) { //this could be used to make modals work between multiple flatlists
    case TOGGLE_DATE_MODAL: //leading to bugs so this is useless code for now
      return { ...state, dateModalVisible: !state.dateModalVisible };
    default:
      return state;
  }
};
