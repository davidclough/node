// Traditionally the rootReducer file is called index.js.

import {combineReducers} from "redux";
import courses from "./courseReducer";    // DC: He uses different names for readability when used.

const rootReducer = combineReducers({
  courses
});

export default rootReducer;
