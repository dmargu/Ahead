import {
  ADD_TODO,
  CHANGE_DATE,
  REMOVE_TODO,
  OPEN_ITEM_MODAL
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
          completed: false,
          date: null
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
    default:
      return state;
  }
};

export default todos;
