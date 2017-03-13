import React from 'react';
import { shallow } from 'enzyme';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { NewTaskForm } from '../../../app/components/tasks/newTaskForm';

describe('components', () => {
  describe('NewTaskForm', () => {
    test(`NewTaskForm should be showed`, () => {

      const component = shallow(
          <NewTaskForm />
      );
      
      expect(component.find('form').exists()).toBe(true);
      expect(component.find(RaisedButton).exists()).toBe(true);
      expect(component.find(TextField).exists()).toBe(true);
    });
  });
});
