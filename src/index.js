import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux-reducers";
import FrontEndApp from "./redux-containers/FrontEndApp";
import ReduxThunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <FrontEndApp />
  </Provider>,
  document.getElementById("app")
);
