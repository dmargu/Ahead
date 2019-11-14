import { PERSIST_REHYDRATE } from 'redux-persist/lib/constants';
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
  CHANGE_NOTES,
  ITEM_MENU_TOGGLED,
  TOGGLE_NOTES_MODAL,
  TOGGLE_DATE_MODAL,
  CLEAR_DATE,
  TOGGLE_REMINDERS
} from '../actions/types';

const initialState = {
  todos: [],
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case PERSIST_REHYDRATE:
      return action.payload.TodoReducer || [];
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, {
          id: shortid.generate(),
          text: action.text,
          notes: null,
          completed: false,
          date: null,
          tenMinReminder: false,
          thirtyMinReminder: false,
          oneHourReminder: false,
          oneDayReminder: false,
          startReminder: false,
          itemMenuToggled: false,
          dateModalVisible: false,
          notesModalVisible: false,
          remindersToggled: false
        }]
      };
    case CHANGE_DATE:
      return {
        ...state,
        todos: state.todos.map(todo => ((todo.id === action.id)
          ? { ...todo, date: action.payload } : todo)),
      };
    case CLEAR_DATE:
      return {
        ...state,
        todos: state.todos.map(todo => ((todo.id === action.id)
          ? { ...todo, date: null } : todo)),
      };
    case REMOVE_TODO: {
      const newList = state.todos.filter(item => item.id !== action.id);
      return {
      ...state,
      todos: newList
      };
    }
    case TOGGLE_DATE_MODAL:
      return {
        ...state,
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, dateModalVisible: !item.dateModalVisible } : item))
      };
    case TOGGLE_NOTES_MODAL:
      return {
        ...state,
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, notesModalVisible: !item.notesModalVisible } : item))
      };
    case TOGGLE_REMINDERS:
    return {
      ...state,
      todos: state.todos.map(item => ((item.id === action.id)
        ? { ...item, remindersToggled: !item.remindersToggled } : item))
    };
    case TEN_MIN_REMINDER:
      return {
        ...state,
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, tenMinReminder: !item.tenMinReminder } : item))
      };
    case THIRTY_MIN_REMINDER:
      return {
        ...state,
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, thirtyMinReminder: !item.thirtyMinReminder } : item))
      };
    case ONE_HOUR_REMINDER:
      return {
        ...state,
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, oneHourReminder: !item.oneHourReminder } : item))
      };
    case ONE_DAY_REMINDER:
      return {
        ...state,
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, oneDayReminder: !item.oneDayReminder } : item))
      };
    case START_REMINDER:
      return {
        ...state,
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, startReminder: !item.startReminder } : item))
      };
    case CHANGE_NOTES:
      return {
        ...state,
        todos: state.todos.map(item => ((item.id === action.id)
          ? { ...item, notes: action.payload } : item))
      };
    case ITEM_MENU_TOGGLED:
      return {
        ...state,
        todos: state.todos.map(item => ((item.id === action.payload.id)
          ? { ...item, itemMenuToggled: !item.itemMenuToggled } : item))
      };
    default:
      return state;
  }
};

export default todos;
