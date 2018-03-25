import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageCoursePage as UnconnectedManageCoursePage} from './ManageCoursePage';

describe('Manage Course Page', () => {
  it('sets error message when trying to save empty title', () => {
    let props = {
      authors: [],
      // Actions in our code return thunks and thunks utilise Promises.
      // Therefore our mock can just return a resolved with an empty value.
      actions: { saveCourse: () => Promise.resolve() },
      course: {id:"", watchHref:"", title:"", authorId:"", length:"", category:""}
    };
    
    // mount renders all child layers, unlike shallow.
    const wrapper = mount(<UnconnectedManageCoursePage {...props} />);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    // At the time this was written we hadn't added this feature.
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});
