import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./helpers";
import "react-notifications/lib/notifications.css";
import "./assets/scss/index.scss";
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import { MultiLanguage } from "multiLanguage";

ReactDOM.render(
  <Provider store={store}>
    <MultiLanguage />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
