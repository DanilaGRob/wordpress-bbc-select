import React, { Component, createRef } from "react";
export default class InputList extends Component {
  constructor(props) {
    super(props);
    this[props.name] = createRef();
  }
  render() {
    const { className, showName, name, handleChange, value } = this.props;
    console.log(value);
    return (
      <div className={"config_input " + className}>
        <span className="config_helper">{showName}</span>
        <input
          type="text"
          onBlur={e => handleChange(name, e.currentTarget.value)}
          ref={this[name]}
        />
      </div>
    );
  }
}
