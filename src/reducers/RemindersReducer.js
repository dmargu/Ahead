import { PERSIST_REHYDRATE } from 'redux-persist/lib/constants';
import {
  ADD_NOTIFICATION_ID
} from '../actions/types';

const initialState = {
  notificationIDs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.RemindersReducer || [];
    case ADD_NOTIFICATION_ID:
      return { ...state,
        notificationIDs: [...state.notificationIDs,
        {
          itemID: action.item.id,
          reminderType: action.reminderType,
          notificationID: action.notificationID
        }]
      };
    default:
      return state;
  }
};
