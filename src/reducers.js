import { combineReducers } from 'redux';
import FireduxInstance from './fireduxSettings';
import todoReducer from './app/todoReducer';
import filterReducer from './app/filterReducer';

const mainReducer = combineReducers({
  todoReducer,
  filterReducer,
  firedux: FireduxInstance.reducer()
});

export default mainReducer;
