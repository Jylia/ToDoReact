import React from 'react';
import { shallow } from 'enzyme';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { TaskItemName } from '../../../app/components/tasks/taskName';

describe('components', () => {
  describe('TaskItemName', () => {
    test(`TaskItemName should be showed`, () => {

      const task = {
        id:5, name:'Fifth Task!', isCompleted: false, isEditable: false
      }

      const component = shallow(
        <TaskItemName
          taskItem={task}
        />
      );
      
      expect(component.find('span').exists()).toBe(true);
      expect(component.find('span').text()).toBe(task.name);
    });
  });
});
