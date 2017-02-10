import { createStore } from 'redux';
import mainReducer from './reducers';

export default function configureStore(initialState = {}) {
  const store = createStore(
    mainReducer,
    initialState
  );

  return store;
};
