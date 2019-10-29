import React, { Component, createRef } from "react";
import uniqid from "uniqid";
export default class SelectInput extends Component {
  constructor(props) {
    super(props);
    this[props.name] = createRef();
  }
  render() {
    const { className, helperText, name, handleChange, options } = this.props;
    let { value } = this.props;
    if (!value) value = "empty";
    else if (!options.find(option => option.id == value)) value = "null";
    return (
      <div className={"config_input " + className}>
        <span className="config_helper">{helperText}</span>
        <select
          onChange={e => {
            handleChange(name, e.currentTarget.value);
          }}
          ref={this[name]}
          value={value}
        >
          {options.map(option => (
            <option value={option.id} key={uniqid()}>
              {option.typeName}
            </option>
          ))}
          <option hidden value="empty">
            Select a type
          </option>
          <option hidden value="null">
            Doesn't exist
          </option>
        </select>
      </div>
    );
  }
}
