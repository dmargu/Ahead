import {
  CREATE_CLASS
} from './types';

export const createClass = (values) => {
  return {
    type: CREATE_CLASS,
    payload: values
  };
};
