import {
  OPEN_PLUS_MODAL,
  CLOSE_PLUS_MODAL,
  OPEN_ITEM_MODAL,
  CLOSE_ITEM_MODAL
} from '../actions/types';


const initialState = {
  plusModalVisible: false,
  itemModalVisible: false,
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
    default:
      return state;
  }
};
