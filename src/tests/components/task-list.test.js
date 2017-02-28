import React from 'react';
import { TaskList } from '../../app/components/task-list';
import renderer from 'react-test-renderer';
import Checkbox from 'material-ui/Checkbox';
import NewTaskForm from '../../app/components/new-task-form';
import TaskItem from '../../app/components/task-item';
import { shallow, mount, render } from 'enzyme';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

test('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});

Object.entries = x =>
  Object.keys(x).reduce((y, z) =>
    y.push([z, x[z]]) && y, [])

const tasks = {
  5: {id:5, name:'Fifth Task!', isCompleted: false},
  6: {id:6, name:'New Great Task', isCompleted: true}
}

describe('components', () => {
  describe('TaskList', () => {
    test(`'Loading data' should be displayed when data has not loaded yet`, () => {

      const component = renderer.create(
        <TaskList
          isLoading={true}
          fetchData={() => {}}
        />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('fetchData() should be called once', () => {
      var fetchDataMock = jest.fn();

      const component = renderer.create(
        <TaskList
          isLoading={true}
          fetchData={fetchDataMock} />
      );

      expect(fetchDataMock.mock.calls.length).toBe(1);
    });

    test(`task list container should be rendered when data has already loaded`, () => {

      const component = shallow(
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <TaskList
            isLoading={false}
            fetchData={() => {}}
            tasks={tasks}
            visibilityFilter={'ALL'}
            markAllAsDone={() => {}}
          >
          </TaskList>
        </MuiThemeProvider>
      );
      
      expect(component.dive().find('.TaskList').exists()).toBe(true);
      expect(component.dive().find('.container').exists()).toBe(true);
      expect(component.dive().find('.filters').exists()).toBe(true);
      expect(component.dive().find('h3').exists()).toBe(true);
      expect(component.dive().find('h3').html()).toBe('<h3>Tasks for Today</h3>');
      expect(component.dive().find('.filters').children().length).toBe(3);
      expect(component.dive().find(Checkbox).exists()).toBe(true);
      expect(component.dive().find(NewTaskForm).exists()).toBe(true);
      expect(component.dive().find(TaskItem).exists()).toBe(true);
      expect(component.dive().find(TaskItem).length).toBe(Object.keys(tasks).length);
    });
  });
});

