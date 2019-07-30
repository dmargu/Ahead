import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, CHANGE_DATE } from './types';

export const addTodo = (text) => {
  return {
    type: ADD_TODO,
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

export const changeDate = (date) => {
  return {
    type: CHANGE_DATE,
    payload: date
  };
};
