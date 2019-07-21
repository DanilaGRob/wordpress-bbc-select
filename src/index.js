import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./redux-containers/App";
import { createStore } from "redux";
import rootReducer from "./redux-reducers";

import "./styles/app.scss";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
