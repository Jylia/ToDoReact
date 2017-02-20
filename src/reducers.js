import { combineReducers } from 'redux';
import FireduxInstance from './fireduxSettings';
import todo from './app/todoReducer';
import filter from './app/filterReducer';

const mainReducer = combineReducers({
  todo,
  filter,
  firedux: FireduxInstance.reducer()
});

export default mainReducer;
