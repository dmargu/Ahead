import {
  TOGGLE_DATE_MODAL,
  TOGGLE_CREATE_CLASS_MODAL,
  TOGGLE_CREATE_HOMEWORK_MODAL,
  TOGGLE_CREATE_TEST_MODAL
} from '../actions/types';


const initialState = {
  dateModalVisible: false,
  createClassModalVisible: false,
  createHomeworkModalVisible: false,
  createTestModalVisible: false
};

export default (state = initialState, action) => {
  switch (action.type) { //this could be used to make modals work between multiple flatlists
    case TOGGLE_DATE_MODAL: //leading to bugs so this is useless code for now
      return { ...state, dateModalVisible: !state.dateModalVisible };
    case TOGGLE_CREATE_CLASS_MODAL:
      return { ...state, createClassModalVisible: !state.createClassModalVisible };
    case TOGGLE_CREATE_HOMEWORK_MODAL:
      return { ...state, createHomeworkModalVisible: !state.createHomeworkModalVisible };
    case TOGGLE_CREATE_TEST_MODAL:
      return { ...state, createTestModalVisible: !state.createTestModalVisible };
    default:
      return state;
  }
};
