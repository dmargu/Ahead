import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO
} from '../actions/types';

const initialState = {
  todos: []
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, {
          id: action.id,
          text: action.text,
          completed: false
        }] };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => ((todo.id === action.id)
          ? { ...todo, completed: !todo.completed } : todo))
      };
    case REMOVE_TODO:
      return {
      ...state,
      todos: state.todos.filter(item => item.id !== action.id)
    };
    default:
      return state;
  }
};

export default todos;
