import { combineReducers } from 'redux';
import todo from './app/todoReducer';
import filter from './app/filterReducer';

const mainReducer = combineReducers({
  todo,
  filter
});

export default mainReducer;
