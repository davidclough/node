import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

// "Testing Thunks".
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// OVERKILL for such a simple function.
describe('Course Actions', () => {
  describe('createCourseSuccess', () => {
    it('should create a CREATE_COURSE_SUCCESS action', () => {
      // Arrange.
      const course = {id: 'clean-code', title: 'Clean Code'};
      const expectedAction = {
        type: types.CREATE_COURSE_SUCCESS,
        course: course
      };

      // Act.
      const action = courseActions.createCourseSuccess(course);

      // Assert.
      expect(action).toEqual(expectedAction);
    });
  });
});

// "Testing Thunks".

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // "done" is passed to Mocha when async work is complete.
  it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading coarses', (done) => {
    // Here's an example call to nock (node mock). We don't need nock here as our code only calls a mock API anyway.
    // nock ('http://example.com/')
    //  .get('/courses')
    //  .reply(200, {body: {course: [{id: 1, firstName: 'Cory', lastName: 'House'}]}});

    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_COURSES_SUCCESS, body: {course: [{id: 'clean-code', title: 'Clean Code'}]}}
    ];

    const store = mockStore({course: []}, expectedActions);
    // When our mock API has our artificial 1000ms delay we see that reflected in the test time (the loadCourses() action calls the API).
    store.dispatch(courseActions.loadCourses())
      .then(() =>{
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
        expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
        done();
      });
  });
});