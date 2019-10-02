import {
  OPEN_PLUS_MODAL,
  CLOSE_PLUS_MODAL,
  OPEN_ITEM_MODAL,
  CLOSE_ITEM_MODAL,
  OPEN_NOTES_MODAL,
  CLOSE_NOTES_MODAL
} from '../actions/types';


const initialState = {
  plusModalVisible: false,
  itemModalVisible: false,
  notesModalVisible: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_PLUS_MODAL:
      return { ...state, plusModalVisible: action.payload };
    case CLOSE_PLUS_MODAL:
      return { ...state, plusModalVisible: action.payload };
    case OPEN_ITEM_MODAL:
      return { ...state,
        itemModalVisible: action.payload
      };
    case CLOSE_ITEM_MODAL:
      return { ...state, itemModalVisible: action.payload };
    case OPEN_NOTES_MODAL:
      return { ...state, notesModalVisible: true };
    case CLOSE_NOTES_MODAL:
      return { ...state, notesModalVisible: false };
    default:
      return state;
  }
};
