import { combineReducers } from 'redux';
import tasks from './todosReducer';
import loading from './loadingReducer';
import allMarkedAsDone from './allMarkedAsDoneReducer';

const mainReducer = combineReducers({
  tasks,
  loading,
  allMarkedAsDone
});

export default mainReducer;
