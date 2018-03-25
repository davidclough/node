import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    // Extra optional parameter. There are further pieces of middleware - check out react-slingshot.
    applyMiddleware(thunk)
  );
}
