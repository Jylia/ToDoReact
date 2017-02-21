import { combineReducers } from 'redux';
import tasks from './todosReducer';
import loading from './loadingReducer';

const mainReducer = combineReducers({
  tasks,
  loading
});

export default mainReducer;
