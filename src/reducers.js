import { combineReducers } from 'redux';
import todos from './app/todoReducers/mainReducer';
import filter from './app/filterReducer';

const mainReducer = combineReducers({
  todos,
  filter
});

export default mainReducer;
