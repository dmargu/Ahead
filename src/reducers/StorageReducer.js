import { ADD_NOTIFICATION_ID, CANCEL_NOTIFICATION } from '../actions/types';

const initialState = {
  IDs: []
};

const storage = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION_ID:
      return {
        ...state,
        IDs:
        [
          ...state.IDs,
          {
            itemID: action.item.id,
            reminderType: action.reminderType,
            notificationID: action.notificationID
          }
        ]
      };
    case CANCEL_NOTIFICATION:
      console.log(state.IDs);
      return { ...state };
    default:
      return state;
  }
};

export default storage;
