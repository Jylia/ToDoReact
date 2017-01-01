import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import reactTapEventPlugin from 'react-tap-event-plugin';
import {
  initializeApp
} from 'firebase';

const config = {
  apiKey: "AIzaSyCCYaZZ623P_pQu276vuGf761kZk_EhOBI",
  authDomain: "todo-85f3f.firebaseapp.com",
  databaseURL: "http://todo-85f3f.firebaseio.com",
  storageBucket: "todo-85f3f.appspot.com",
  messagingSenderId: "1034314432668"
};

initializeApp(config);

reactTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
