import React, { Component, Fragment } from "react";
import Types from "../redux-containers/Types";
import Comparisons from "../redux-containers/Comparisons";
import "../styles/app.scss";
import Food from "../redux-containers/Food";
export default class App extends Component {
  render() {
    return (
      <div className="configs">
        <div className="config">
          <span className="config_title">Types</span>
          <Types className="config_types" />
        </div>
        <div className="config">
          <span className="config_title">Comparisons</span>
          <Comparisons className="config_comparisons" />
        </div>
        <div className="config">
          <span className="config_title">Food</span>
          <Food className="config_food" />
        </div>
      </div>
    );
  }
}
