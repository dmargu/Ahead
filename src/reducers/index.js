import { combineReducers } from 'redux';
import ModalReducer from './ModalReducer';
import TodoReducer from './TodoReducer';

export default combineReducers({
  ModalReducer, TodoReducer
});
