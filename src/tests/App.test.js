import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from '../app/App';

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
