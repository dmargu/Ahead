import {
  CREATE_CLASS,
  CREATE_HOMEWORK,
  CREATE_TEST,
  REMOVE_HOMEWORK,
  REMOVE_TEST,
  CHANGE_NOTES,
  ADD_PICTURE,
  HOMEWORK_REMINDER,
  CANCEL_NOTIFICATION,
  CHANGE_CUSTOM_REMINDER,
  CHANGE_DATE,
  CANCEL_ALL_NOTIFICATIONS,
  CLEAR_DATE,
  CHANGE_LOCATION,
  CHANGE_OFFICE_HOURS,
  TOGGLE_ITEM_STUDY_DAY
} from '../actions/types';

const initialState = {
  classes: [],
  homework: [],
  tests: []
};

const classes = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CLASS:
      return {
        ...state,
        classes: [
          ...state.classes, {
            id: action.id,
            name: action.payload.className,
            firstDayOfClass: action.payload.firstDayOfClass,
            lastDayOfClass: action.payload.lastDayOfClass,
            classStartTime: action.payload.classStartTime,
            classEndTime: action.payload.classEndTime,
            afterClassReminders: action.payload.afterClassReminders,
            daysOfWeek: action.daysOfWeek,
            classDays: action.classDays,
            location: '',
            officeHours: ''
          }
        ]
      };
    case CREATE_HOMEWORK:
      return {
        ...state,
        homework: [
          ...state.homework, {
            id: action.id,
            assignmentName: action.values.assignmentName,
            className: action.values.class,
            notes: action.values.notes,
            pictures: action.state.pictures,
            date: action.dueDate,
            oneDayReminder: action.reminders.oneDay,
            twoDayReminder: action.reminders.twoDay,
            threeDayReminder: action.reminders.threeDay,
            customReminder: action.reminders.custom,
            customReminderTime: action.reminders.customTime
          }
        ]
      };
    case CREATE_TEST:
      return {
        ...state,
        tests: [
          ...state.tests, {
            id: action.id,
            testName: action.values.testName,
            className: action.values.class,
            notes: action.values.notes,
            pictures: action.state.pictures,
            date: action.state.testDate,
            oneDayStudy: action.state.oneDayStudy,
            twoDayStudy: action.state.twoDayStudy,
            threeDayStudy: action.state.threeDayStudy,
            fourDayStudy: action.state.fourDayStudy,
            fiveDayStudy: action.state.fiveDayStudy,
            sixDayStudy: action.state.sixDayStudy
          }
        ]
      };
    case REMOVE_HOMEWORK: {
      const newList = state.homework.filter(item => item.id !== action.id);
      return {
        ...state,
        homework: newList
      };
    }
    case REMOVE_TEST: {
      const newList = state.tests.filter(item => item.id !== action.id);
      return {
        ...state,
        tests: newList
      };
    }
    case CHANGE_NOTES:
      return {
        ...state,
        homework: state.homework.map(item => ((item.id === action.id)
          ? { ...item, notes: action.payload } : item)),
        tests: state.tests.map(item => ((item.id === action.id)
          ? { ...item, notes: action.payload } : item))
      };
    case ADD_PICTURE:
      return {
        ...state,
        homework: state.homework.map(item => ((item.id === action.id)
          ? { ...item, pictures: action.payload } : item)),
        tests: state.tests.map(item => ((item.id === action.id)
          ? { ...item, pictures: action.payload } : item))
      };
    case CHANGE_DATE:
      return {
        ...state,
        homework: state.homework.map(item => ((item.id === action.id)
          ? { ...item, date: action.payload } : item)),
        tests: state.tests.map(item => ((item.id === action.id)
          ? { ...item, date: action.payload } : item))
      };
    case CANCEL_ALL_NOTIFICATIONS:
      return {
        ...state,
        homework: state.homework.map(item => ((item.id === action.id)
          ? {
            ...item,
            oneDayReminder: false,
            twoDayReminder: false,
            threeDayReminder: false,
            customReminder: false,
            customReminderTime: null
          }
          : item))
      };
    case CLEAR_DATE:
      return {
        ...state,
        homework: state.homework.map(item => ((item.id === action.id)
          ? { ...item, date: null } : item)),
        tests: state.tests.map(item => ((item.id === action.id)
          ? { ...item, date: null } : item))
      };
    case CHANGE_CUSTOM_REMINDER:
      return {
        ...state,
        homework: state.homework.map(item => ((item.id === action.id)
          ? { ...item, customReminderTime: action.reminderTime } : item))
      };
    case CHANGE_LOCATION:
      return {
        ...state,
        classes: state.classes.map(item => ((item.id === action.id)
          ? { ...item, location: action.payload } : item))
      };
    case CHANGE_OFFICE_HOURS:
      return {
        ...state,
        classes: state.classes.map(item => ((item.id === action.id)
          ? { ...item, officeHours: action.payload } : item))
      };
    case HOMEWORK_REMINDER:
      switch (action.reminderType) {
        case 'oneDay':
          return {
            ...state,
            homework: state.homework.map(item => ((item.id === action.id)
              ? { ...item, oneDayReminder: !item.oneDayReminder } : item))
          };
        case 'twoDay':
          return {
            ...state,
            homework: state.homework.map(item => ((item.id === action.id)
              ? { ...item, twoDayReminder: !item.twoDayReminder } : item))
          };
        case 'threeDay':
          return {
            ...state,
            homework: state.homework.map(item => ((item.id === action.id)
              ? { ...item, threeDayReminder: !item.threeDayReminder } : item))
          };
        case 'custom':
          return {
            ...state,
            homework: state.homework.map(item => ((item.id === action.id)
              ? { ...item, customReminder: !item.customReminder, customReminderTime: action.reminderDate }
                : item))
          };
        default:
          return state;
      }
    case CANCEL_NOTIFICATION:
      switch (action.reminderType) {
        case 'oneDay':
          return {
            ...state,
            homework: state.homework.map(item => ((item.id === action.id)
              ? { ...item, oneDayReminder: !item.oneDayReminder } : item))
          };
        case 'twoDay':
          return {
            ...state,
            homework: state.homework.map(item => ((item.id === action.id)
              ? { ...item, twoDayReminder: !item.twoDayReminder } : item))
          };
        case 'threeDay':
          return {
            ...state,
            homework: state.homework.map(item => ((item.id === action.id)
              ? { ...item, threeDayReminder: !item.threeDayReminder } : item))
          };
        case 'custom':
          return {
            ...state,
            homework: state.homework.map(item => ((item.id === action.id)
              ? { ...item, customReminder: !item.customReminder } : item))
          };
        default:
          return state;
      }
    case TOGGLE_ITEM_STUDY_DAY:
      switch (action.payload) {
        case 'one':
          return {
            ...state,
            tests: state.tests.map(item => ((item.id === action.id)
              ? { ...item, oneDayStudy: !item.oneDayStudy } : item))
          };
        case 'two':
          return {
            ...state,
            tests: state.tests.map(item => ((item.id === action.id)
              ? { ...item, twoDayStudy: !item.twoDayStudy } : item))
          };
        case 'three':
          return {
            ...state,
            tests: state.tests.map(item => ((item.id === action.id)
              ? { ...item, threeDayStudy: !item.threeDayStudy } : item))
          };
        case 'four':
          return {
            ...state,
            tests: state.tests.map(item => ((item.id === action.id)
              ? { ...item, fourDayStudy: !item.fourDayStudy } : item))
          };
        case 'five':
          return {
            ...state,
            tests: state.tests.map(item => ((item.id === action.id)
              ? { ...item, fiveDayStudy: !item.fiveDayStudy } : item))
          };
        case 'six':
          return {
            ...state,
            tests: state.tests.map(item => ((item.id === action.id)
              ? { ...item, sixDayStudy: !item.sixDayStudy } : item))
          };
        default: return state;
      }
    default:
      return state;
  }
};

export default classes;
