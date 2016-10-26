import "babel-polyfill";      // DC: object.assign is one thing that cannot be transpile to ES5.
import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";      // bH uses HTML 5 Push State.
import routes from "./routes";
import "./styles/styles.css";     // Webpack can import CSS files too (using this line).
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//console.log("hi");

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById("app")
);
