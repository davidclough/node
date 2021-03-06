import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./components/App";
import HomePage from "./components/home/HomePage";
import AboutPage from "./components/about/AboutPage";
import CoursesPage from "./components/course/CoursesPage";
// Disabled eslint for this line as the file exports ManageCoursePage as both a named export and as the default - should be a better solution.
import ManageCoursePage from "./components/course/ManageCoursePage";  // eslint-disable-line import/no-named-as-default

import NotFoundPage from './components/common/NotFoundPage';

// NOTE(DC): I stuck braces in here instead of brackets and got compilation errors.
//           In actual fact, the compilation error was being indicated by the command line but
//           I just didn't spot the error and assumed that some other underlying problem was causing it.
// NOTE: Looks like JSX is wrapped in ().
// NOTE: After reading, it looks like the brackets are nothing to do with JSX, they are just added to prevent
//       JavaScript parsers from prematurely terminating the line after the end of a "return" statement, or in this case "export default".
//       https://www.reddit.com/r/reactjs/comments/3k2t5l/what_is_the_meaning_of_return_used_in_the_render/
//       This convention allows us to start the markup on a new line. The alternative in the above link is not to use brackets but
//       to put the first tag of the markup on the same line as the return statement.
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="courses" component={CoursesPage} />
    <Route path="course" component={ManageCoursePage} />
    <Route path="course/:id" component={ManageCoursePage} />
    <Route path="about" component={AboutPage} />
    <Route path="page-not-found" component={NotFoundPage} />
  </Route>
);
