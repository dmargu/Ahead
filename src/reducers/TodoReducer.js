import shortid from 'shortid';
import {
  ADD_TODO,
  CHANGE_DATE,
  REMOVE_TODO,
  TEN_MIN_REMINDER,
  THIRTY_MIN_REMINDER,
  ONE_HOUR_REMINDER,
  ONE_DAY_REMINDER,
  START_REMINDER,
  ADD_PICTURE,
  CHANGE_NOTES,
  TOGGLE_NOTES_MODAL,
  TOGGLE_DATE_MODAL,
  TOGGLE_ITEM_MODAL,
  TOGGLE_ITEM_MODAL_DATE_PICKER,
  CLEAR_DATE,
  TOGGLE_REMINDERS,
  CANCEL_NOTIFICATION,
  CANCEL_ALL_NOTIFICATIONS,
  CHANGE_TODO_NAME
} from '../actions/types';

const initialState = {
  todos: [],
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, {
          id: shortid.generate(),
          text: action.text,
          notes: null,
          date: null,
          pictures: [],
          tenMinReminder: false,
          thirtyMinReminder: false,
          oneHourReminder: false,
          oneDayReminder: false,
          startReminder: false,
          dateModalVisible: false,
          notesModalVisible: false,
          itemModalVisible: false,
          itemModalDatePickerVisible: false,
          remindersToggled: false
        }]
      };
    case CHANGE_DATE:
      return {
        todos: state.todos.map(todo => ((todo.id === action.id)
          ? { ...todo, date: action.payload } : todo)),
      };
    case CANCEL_ALL_NOTIFICATIONS:
      return {
        todos: state.todos.map(todo => ((todo.id === action.id)
          ? {
            ...todo,
            startReminder: false,
            tenMinReminder: false,
            thirtyMinReminder: false,
            oneHourReminder: false,
            oneDayReminder: false
          }
          : todo))
      };
    case CLEAR_DATE:
      return {
        todos: state.todos.map(todo => ((todo.id === action.id)
          ? { ...todo, date: null } : todo)),
      };
    case REMOVE_TODO: {
      const newList = state.todos.filter(item => item.id !== action.id);
      return {
        todos: newList
      };
    }
    case ADD_PICTURE:
      return {
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, pictures: action.payload } : item))
      };
    case CHANGE_TODO_NAME:
      return {
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, text: action.payload } : item))
      };
    case TOGGLE_DATE_MODAL:
      return {
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, dateModalVisible: !item.dateModalVisible } : item))
      };
    case TOGGLE_NOTES_MODAL:
      return {
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, notesModalVisible: !item.notesModalVisible } : item))
      };
    case TOGGLE_ITEM_MODAL:
      return {
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, itemModalVisible: !item.itemModalVisible } : item))
      };
    case TOGGLE_ITEM_MODAL_DATE_PICKER:
      return {
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, itemModalDatePickerVisible: !item.itemModalDatePickerVisible } : item))
      };
    case TOGGLE_REMINDERS:
    return {
      todos: state.todos.map(item => ((item.id === action.id)
        ? { ...item, remindersToggled: !item.remindersToggled } : item))
    };
    case TEN_MIN_REMINDER:
      return {
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, tenMinReminder: !item.tenMinReminder } : item))
      };
    case THIRTY_MIN_REMINDER:
      return {
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, thirtyMinReminder: !item.thirtyMinReminder } : item))
      };
    case ONE_HOUR_REMINDER:
      return {
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, oneHourReminder: !item.oneHourReminder } : item))
      };
    case ONE_DAY_REMINDER:
      return {
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, oneDayReminder: !item.oneDayReminder } : item))
      };
    case START_REMINDER:
      return {
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, startReminder: !item.startReminder } : item))
      };
    case CHANGE_NOTES:
      return {
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, notes: action.payload } : item))
      };
    case CANCEL_NOTIFICATION:
      switch (action.reminderType) {
        case 'start':
          return {
            todos: state.todos.map(item => ((item.id === action.id)
              ? { ...item, startReminder: !item.startReminder } : item))
          };
        case 'tenMin':
          return {
            todos: state.todos.map(item => ((item.id === action.id)
              ? { ...item, tenMinReminder: !item.tenMinReminder } : item))
          };
        case 'thirtyMin':
          return {
            todos: state.todos.map(item => ((item.id === action.id)
              ? { ...item, thirtyMinReminder: !item.thirtyMinReminder } : item))
          };
        case 'oneHour':
          return {
            todos: state.todos.map(item => ((item.id === action.id)
              ? { ...item, oneHourReminder: !item.oneHourReminder } : item))
          };
        case 'oneDay':
          return {
            todos: state.todos.map(item => ((item.id === action.id)
              ? { ...item, oneDayReminder: !item.oneDayReminder } : item))
          };
        default:
          return state;
      }
    default:
      return state;
  }
};

/*const tutorialTodos = [
  {
    id: shortid.generate(),
    text: 'shit',
    notes: null,
    date: null,
    pictures: [],
    tenMinReminder: false,
    thirtyMinReminder: false,
    oneHourReminder: false,
    oneDayReminder: false,
    startReminder: false,
    dateModalVisible: false,
    notesModalVisible: false,
    itemModalVisible: false,
    itemModalDatePickerVisible: false,
    remindersToggled: false
  },
  {
    id: shortid.generate(),
    text: 'fuck',
    notes: null,
    date: null,
    pictures: [],
    tenMinReminder: false,
    thirtyMinReminder: false,
    oneHourReminder: false,
    oneDayReminder: false,
    startReminder: false,
    dateModalVisible: false,
    notesModalVisible: false,
    itemModalVisible: false,
    itemModalDatePickerVisible: false,
    remindersToggled: false
  }
];*/

export default todos;
