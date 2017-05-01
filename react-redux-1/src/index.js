import "babel-polyfill";      // DC: object.assign is one thing that cannot be transpiled to ES5.
import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";      // bH uses HTML 5 Push State.
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

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById("app")
);
