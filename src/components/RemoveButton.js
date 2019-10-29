import React, { Component } from "react";
import { PLUGIN_DIR } from "../../constants";
export default class RemoveButton extends Component {
  render() {
    const { removeFunc, id } = this.props;
    return (
      <img
        src={PLUGIN_DIR + "/src/imgs/remove.svg"}
        className="config_addButton clickable"
        onClick={() => removeFunc(id)}
      />
    );
  }
}
