import React, { Component, createRef } from "react";
import uniqid from "uniqid";
import { PLUGIN_DIR } from "../../../constants";
export default class SelectInputF extends Component {
  constructor(props) {
    super(props);
    this[props.name] = createRef();
  }
  render() {
    const { helperText, name, onChange, options, emptyError } = this.props;
    let { value } = this.props;
    if (!value) value = "empty";
    return (
      <div className="input">
        <span className="helper">{helperText}</span>
        <select
          onChange={e => {
            onChange(e.currentTarget.value);
          }}
          className="clickable"
          ref={this[name]}
          value={value}
          style={{
            backgroundImage: `url('${PLUGIN_DIR +
              "/src/imgs/expand-button.svg"}')`
          }}
        >
          {options.map(option => (
            <option value={option.id} key={uniqid()}>
              {option.name}
            </option>
          ))}
          <option hidden value="empty">
            {emptyError}
          </option>
        </select>
      </div>
    );
  }
}
