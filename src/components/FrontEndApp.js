import React, { Component } from "react";
import FoodSelect from "./FoodSelect";
import "../styles/frontEnd.scss";
import { PLUGIN_DIR } from "../../constants";
export default class FrontEndApp extends Component {
  constructor(props) {
    super(props);
    props.loadFood();
  }

  render() {
    const { loading } = this.props;
    if (!loading)
      return (
        <div className="bbc-select">
          <div className="contentWrapper">
            <div
              className="header"
              style={{
                backgroundImage: `url('${PLUGIN_DIR + "/src/imgs/header.svg"}')`
              }}
            />
            <div className="content">
              <div className="title">
                How do your food choices impact on the environment?
              </div>
              <FoodSelect />
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className="bbc-select">
          <div className="contentWrapper">
            <div
              className="header"
              style={{
                backgroundImage: `url('${PLUGIN_DIR + "/src/imgs/header.svg"}')`
              }}
            />
            <div className="content">
              <div className="title">
                How do your food choices impact on the environment?
              </div>
              <img
                src={PLUGIN_DIR + "/src/imgs/loading.svg"}
                className="foodLoader"
              />
            </div>
          </div>
        </div>
      );
  }
}
