import React, { Component } from "react";
export default class CheckboxInput extends Component {
  render() {
    const { className, helperText, name, handleChange, value } = this.props;
    return (
      <div className={"config_input " + className}>
        <span className="config_helper">{helperText}</span>
        <input
          type="checkbox"
          onChange={e => handleChange(name, +e.currentTarget.checked)}
          ref={this[name]}
          checked={parseInt(value)}
        />
      </div>
    );
  }
}
