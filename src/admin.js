import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./redux-containers/App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux-reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
