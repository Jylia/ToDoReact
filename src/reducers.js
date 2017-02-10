import { combineReducers } from 'redux';

const initialState = [];

const todos = (state = initialState, action) => {
  return state;
};

const mainReducer = combineReducers({
  todos
});

export default mainReducer;
