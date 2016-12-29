import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import reactTapEventPlugin from 'react-tap-event-plugin';
reactTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
