import {
  ADD_TODO,
  CHANGE_DATE,
  REMOVE_TODO,
  OPEN_ITEM_MODAL,
  TEN_MIN_REMINDER,
  THIRTY_MIN_REMINDER,
  ONE_HOUR_REMINDER,
  ONE_DAY_REMINDER,
  CHANGE_NOTES
} from '../actions/types';

const initialState = {
  todos: [],
  currItem: {}
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, {
          id: state.todos.length,
          text: action.text,
          notes: null,
          completed: false,
          date: null,
          tenMinReminder: false,
          thirtyMinReminder: false,
          oneHourReminder: false,
          oneDayReminder: false
        }]
      };
    case CHANGE_DATE:
      return {
        ...state,
        todos: state.todos.map(todo => ((todo.id === state.currItem.id)
          ? { ...todo, date: action.payload } : todo))
      };
    case REMOVE_TODO: {
      const newList = state.todos.filter(item => item.id !== action.id);
      for (let i = 0, newId = 0; i < newList.length; i++, newId++) {
        newList[i].id = newId;
      }
      return {
      ...state,
      todos: newList
      };
    }
    case OPEN_ITEM_MODAL:
      return {
        ...state,
        currItem: state.todos.find((todo) => todo.id === action.id)
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
    case CHANGE_NOTES:
      return {
        ...state,
        todos: state.todos.map(item => ((item.id === state.currItem.id)
          ? { ...item, notes: action.payload } : item))
      };
    default:
      return state;
  }
};

export default todos;
