import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index"
import App from "./components/App";

import { createStore } from 'redux'
import todoApp from './reducers'
import Root from './components/Root'




render(
  <Provider store={store}>
      <App />
  </Provider>,
    document.getElementById("app")
);

