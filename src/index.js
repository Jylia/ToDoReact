import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/App';
import configureStore from './store';
import reactTapEventPlugin from 'react-tap-event-plugin';
import {
  initializeApp
} from 'firebase';
import { database } from 'firebase';

const config = {
  apiKey: "AIzaSyCCYaZZ623P_pQu276vuGf761kZk_EhOBI",
  authDomain: "todo-85f3f.firebaseapp.com",
  databaseURL: "http://todo-85f3f.firebaseio.com",
  storageBucket: "todo-85f3f.appspot.com",
  messagingSenderId: "1034314432668"
};

initializeApp(config);

database().ref().once('value')
  .then((snapshot) => {
    console.log(snapshot.val());
    const store = configureStore();

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


