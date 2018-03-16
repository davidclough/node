// Traditionally the rootReducer file is called index.js.

import {combineReducers} from "redux";
import courses from "./courseReducer";    // DC: He uses different names for readability when used.
import authors from "./authorReducer";
import ajaxCallsInProgress from "./ajaxStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress
});

export default rootReducer;
