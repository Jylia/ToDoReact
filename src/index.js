import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/App';
import configureStore from './store';
import reactTapEventPlugin from 'react-tap-event-plugin';
import FireduxInstance from './fireduxSettings';

const store = configureStore();

// store.subscribe(() => {
  // const state = store.getState()
// });

FireduxInstance.watch('/')
  .then((snapshot) => {
    // console.log(store.getState().firedux.data);

    reactTapEventPlugin();

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
  }).catch((e) => {
    console.log(e);

    ReactDOM.render(
      <div>
        Sorry, some error occured.
      </div>,
      document.getElementById('root')
    );
  });


