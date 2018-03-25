import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
//import TestUtils from 'react-addons-test-utils';    // It is used by Enzyme but we don't use it directly.
import CourseForm from './CourseForm';

function setup(saving) {
  const props = { course: {}, saving: saving, errors: {}, onSave: () => {}, onChange: () => {} };
  // Renders one layer deep.
  return shallow(<CourseForm {...props} />);
}

describe('CourseForm via React Test Utils', () => {
  it('renders form and h1', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('Save button is labelled "Save" when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('Save button is labelled "Saving..." when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});

//
// Behind the scenes, Enzyme combines:
//    React Test Utils (as used in other test file)
//    JSDOM (In-memory DOM)
//    Cheerio (Fast, jquery style selectors)
//
