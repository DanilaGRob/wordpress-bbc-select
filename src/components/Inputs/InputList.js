import React, { Component, createRef } from "react";
import FoodTypes from "../../redux-containers/FoodTypes";
export default class InputList extends Component {
  constructor(props) {
    super(props);
    this[props.name] = createRef();
  }
  render() {
    const { helperText, className, parentId, value } = this.props;
    return (
      <div className={"config_input " + className}>
        <span className="config_helper">{helperText}</span>
        <FoodTypes
          foodId={parentId}
          values={value}
          className="config_foodTypes"
        />
      </div>
    );
  }
}
