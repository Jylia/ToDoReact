import React from 'react';
import { shallow } from 'enzyme';

import RaisedButton from 'material-ui/RaisedButton';

import { Filter } from '../../../app/components/common/filter';

describe('components', () => {
  describe('Filter', () => {
    test(`Filter should be showed`, () => {

      const component = shallow(
          <Filter/>
      );
      
      expect(component.find(RaisedButton).exists()).toBe(true);
      expect(component.find(RaisedButton).length).toBe(3);
    });
  });
});
