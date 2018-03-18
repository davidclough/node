import "babel-polyfill";      // DC: object.assign is one thing that cannot be transpiled to ES5.
import React from "react";
import { render } from "react-dom";
import configureStore from "./redux/store/configureStore";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import routes from "./react/routes";
import { loadCourses } from "./redux/actions/courseActions";
import { loadAuthors } from "./redux/actions/authorActions";
import "./react/styles/styles.css";     // Webpack can import CSS files too (using this line).
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// DC: It looks like index.js need to go in the root folder. I am not sure what is governing this or if it is just convention.

// May want to rehydrate your store here.
const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

// browserHistory uses HTML 5 Push State to expose nice clean URLs. One older alternative uses #-based URLs.
render(
  // Provider is a react-redux thing. Refined at toot. It uses React's "Context" to make the store available to all container components.
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById("app")
);
