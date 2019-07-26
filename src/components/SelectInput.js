import React, { Component, createRef } from "react";
export default class SelectInput extends Component {
  constructor(props) {
    super(props);
    this[props.name] = createRef();
  }
  render() {
    const { className, showName, name, handleChange, options } = this.props;
    let { value } = this.props;
    console.log(options);
    if (!value) value = "empty";
    else if (!options.find(option => option.id == value)) value = "null";
    return (
      <div className={"config_input " + className}>
        <span className="config_helper">{showName}</span>
        <select
          onChange={e => {
            handleChange(name, e.currentTarget.value);
          }}
          ref={this[name]}
          value={value}
        >
          {options.map(option => (
            <option value={option.id}>{option.typeName}</option>
          ))}
          <option hidden value="empty">
            Please select a type
          </option>
          <option hidden value="null">
            The type doesn't exist
          </option>
        </select>
      </div>
    );
  }
}
