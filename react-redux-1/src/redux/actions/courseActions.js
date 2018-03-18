import * as types from "./actionTypes";
import courseApi from "../../api/mockCourseApi";
import {beginAjaxCall} from "./ajaxStatusActions";

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
  return function (dispatch) {      // <------- a thunk ---- redux-thunk is applied as middleware to the store in configureStore.js
    dispatch(beginAjaxCall());

    return courseApi.getAllCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function saveCourse(course) {
  // getState just here to indicate that we could use it if we wanted to fetch something from the redux store within our thunk.
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());

    return courseApi.saveCourse(course)
      .then(course => {
        course.id ?
          dispatch(updateCourseSuccess(course)) :
          dispatch(createCourseSuccess(course));
      })
      .catch(error => {
        throw(error);
      });
  };
}
