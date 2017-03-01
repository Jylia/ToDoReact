import React from 'react';
import TaskList from '../app/components/task-list';
import { App } from '../app/App';
import { shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('App', () => {
  test(`Task List component should be loaded`, () => {
    const component = shallow(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <App />
      </MuiThemeProvider>
    );
    
    expect(component.dive().find('h2').text()).toBe('ToDo Lists');
    expect(component.dive().find(TaskList).exists()).toBe(true);
  });
});

