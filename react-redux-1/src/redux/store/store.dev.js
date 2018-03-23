import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

// He called the file configureStore.js but this file name caused me a bit of confusion and does not appear to be required by any convention.
// He still called the test file store.test.js.

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    // Extra optional parameter. There are further pieces of middleware - check out react-slingshot.
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}
