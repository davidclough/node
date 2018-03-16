import "babel-polyfill";      // DC: object.assign is one thing that cannot be transpiled to ES5.
import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import routes from "./routes";
import { loadCourses } from "./actions/courseActions";
import { loadAuthors } from "./actions/authorActions";
import "./styles/styles.css";     // Webpack can import CSS files too (using this line).
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//console.log("hi");

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
