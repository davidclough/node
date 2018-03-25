import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

// These are integration tests which test actions, store and reducers together and are the MOST USEFUL.
// DA recommends testing together as well.

describe('Store', () => {
  it('Should handle creating courses', () => {
    // Arrange.
    const store = createStore(rootReducer, initialState);
    const course = {title: 'Clean Code'};

    // Act.
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    // Assert.
    const actual = store.getState().courses[0];
    const expected = {title: 'Clean Code'};
    expect(actual).toEqual(expected);
  });
  
  it('Should handle saving a course whose ID is found in the store', () => {
    // Arrange.
    let state = {
      courses: [
        {id:"1", watchHref:"aaa", title:"aaa", authorId:"aaa", length:"10", category:"aaa"},
        {id:"31", watchHref:"bbb", title:"bbb", authorId:"bbb", length:"100", category:"bbb"}
      ]
    };
    const store = createStore(rootReducer, state);

    // Act.
    const updatedCourse = {id:"31", watchHref:"w", title:"t", authorId:"a", length:"1000", category:"c"};
    const action = courseActions.updateCourseSuccess(updatedCourse);
    store.dispatch(action);

    // Assert.
    const actual = store.getState().courses.filter(x => x.id == "31")[0];
    expect(actual).toEqual(updatedCourse);
  });
});
