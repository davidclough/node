import * as types from '../actions/actionTypes'
import initialState from './initialState'

// Trick indicated by Dan Abramov for detecting end of AJAX calls.
// ALL OUT THUNKS dispatch a SUCCESS action when they complete.
function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  if (action.type === types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (action.type === types.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }

  return state;
}
