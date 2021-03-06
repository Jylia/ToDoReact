import React from 'react';
import { shallow } from 'enzyme';

import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import { ListItem } from 'material-ui/List';

import { TaskItem } from '../../../app/components/tasks/taskItem';
import TaskItemName from '../../../app/components/tasks/taskName';

describe('components', () => {
  describe('TaskItem', () => {
    test(`TaskItem should be showed`, () => {

      const task = {
        id:5, name:'Fifth Task!', isCompleted: false, isEditable: false
      }

      const component = shallow(
          <TaskItem
            taskItem={task}
          />
      );
      
      // console.log(component.debug());
      expect(component.find(ListItem).length).toBe(1);
      expect(component.find(Checkbox).length).toBe(1);
      expect(component.find(TaskItemName).length).toBe(1);
      expect(component.find(RaisedButton).length).toBe(1);
      expect(component.find(RaisedButton).prop('label')).toBe("Delete Task");
    });
  });
});
