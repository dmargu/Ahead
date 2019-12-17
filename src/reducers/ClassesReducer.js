import shortid from 'shortid';
import {
  CREATE_CLASS,
  CREATE_HOMEWORK
} from '../actions/types';

const initialState = {
  classes: [],
  homework: []
};

const classes = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CLASS:
      return {
        ...state,
        classes: [
          ...state.classes, {
            id: shortid.generate(),
            name: action.payload.className,
            firstDayOfClass: action.payload.firstDayOfClass,
            lastDayOfClass: action.payload.lastDayOfClass,
            classStartTime: action.payload.classStartTime,
            classEndTime: action.payload.classEndTime,
            afterClassReminders: action.payload.afterClassReminders,
            daysOfWeek: action.daysOfWeek,
            classDays: action.classDays
          }
        ]
      };
    case CREATE_HOMEWORK:
      return {
        ...state,
        homework: [ //get the active reminders by looking through storage and see what reminders are there
          ...state.homework, { //with the same id and then you can find the type
            id: action.id,
            assignmentName: action.values.assignmentName,
            className: action.values.class,
            notes: action.values.notes,
            pictures: action.state.pictures,
            dueDate: action.dueDate,
          }
        ]
      };
    default:
      return state;
  }
};

export default classes;
