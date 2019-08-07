import { combineReducers } from 'redux';
import ModalReducer from './ModalReducer';
import TodoReducer from './TodoReducer';
import RemindersReducer from './RemindersReducer';

export default combineReducers({
  ModalReducer, TodoReducer, RemindersReducer
});
