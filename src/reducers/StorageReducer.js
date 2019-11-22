import { ADD_NOTIFICATION_ID, CANCEL_NOTIFICATION } from '../actions/types';

const initialState = {
  notificationIDs: [],
  numbers: []
};

const storage = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION_ID:
      return {
        ...state,
        notificationIDs:
        [
          ...state.notificationIDs,
          {
            itemID: action.item.id,
            reminderType: action.reminderType,
            notificationID: action.notificationID
          }
        ]
      };
    case CANCEL_NOTIFICATION:
      console.log(state.notificationIDs);
      return { ...state };
    case 'testing':
      return {
        ...state,
        numbers: [
          ...state.numbers,
          action.number
        ]
      };
    default:
      return state;
  }
};

export default storage;
