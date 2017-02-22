import { createStore, applyMiddleware, compose } from 'redux';
import mainReducer from './reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState = {}) {
  const middleware = applyMiddleware( thunk );

  const store = createStore(
    mainReducer,
    compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  );

  return store;
};