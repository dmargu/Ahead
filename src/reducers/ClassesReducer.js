import shortid from 'shortid';
import {
  CREATE_CLASS
} from '../actions/types';

const initialState = {
  classes: [],
};

const classes = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CLASS:
      return {
        ...state,
        classes: [
          ...state.classes, {
            name: action.payload.className,
            firstDayOfClass: action.payload.firstDayOfClass,
            lastDayOfClass: action.payload.lastDayOfClass,
            classStartTime: action.payload.classStartTime,
            classEndTime: action.payload.classEndTime,
            afterClassReminders: action.payload.afterClassReminders,
            daysOfWeek: action.payload.daysOfWeek,
            id: shortid.generate()
          }
        ]
      };
    default:
      return state;
  }
};

export default classes;
