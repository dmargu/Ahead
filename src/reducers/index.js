import { combineReducers } from 'redux';
import ModalReducer from './ModalReducer';
import TodoReducer from './TodoReducer';
import RemindersReducer from './RemindersReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  ModalReducer, TodoReducer, RemindersReducer, AuthReducer
});
