import { combineReducers } from 'redux';
import FireduxInstance from './fireduxSettings';
import todos from './app/reducer';

const mainReducer = combineReducers({
  todos,
  firedux: FireduxInstance.reducer()
});

export default mainReducer;
