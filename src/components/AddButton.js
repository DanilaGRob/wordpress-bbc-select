import React, { Component } from "react";
import uniqid from "uniqid";
import { PLUGIN_DIR } from "../../constants";
export default class AddButton extends Component {
  render() {
    const { addFunc, foodId } = this.props;
    return (
      <img
        src={PLUGIN_DIR + "/src/imgs/add.svg"}
        className="config_addButton clickable"
        onClick={() => addFunc({ id: uniqid(), foodId })}
      />
    );
  }
}
