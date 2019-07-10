import { OPEN_MODAL, CLOSE_MODAL } from '../actions/types';


const initialState = {
  modalVisible: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, modalVisible: action.payload };
    case CLOSE_MODAL:
      return { ...state, modalVisible: action.payload };
    default:
      return state;
  }
};
