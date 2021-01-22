import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import 'fontsource-roboto';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.render(<App />, document.getElementById("root"));

// allows for live updating
module.hot.accept();
