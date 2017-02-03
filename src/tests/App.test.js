import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from '../app/App';
import { database } from 'firebase';
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

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders tasks list', () => {
  const component = renderer.create(
    <div className="TaskList"></div>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
