import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from './types';

let nextID = 0;

export const addTodo = (text) => {
  return {
    type: ADD_TODO,
    id: nextID++,
    text
  };
};

export const toggleTodo = (item) => {
  return {
    type: TOGGLE_TODO,
    id: item.id
  };
};

export const removeTodo = (item) => {
  return {
    type: REMOVE_TODO,
    id: item.id
  };
};
