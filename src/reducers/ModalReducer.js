import {
  TOGGLE_DATE_MODAL
} from '../actions/types';


const initialState = {
  dateModalVisible: false
};

export default (state = initialState, action) => {
  switch (action.type) { //plan here is to stop flatlist from updating when visible
    case TOGGLE_DATE_MODAL: //not working though it mess up whole thing
      return { ...state, dateModalVisible: !state.dateModalVisible };
    default:
      return state;
  }
};
