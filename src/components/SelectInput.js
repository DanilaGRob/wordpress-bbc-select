import React, { Component, createRef } from "react";
export default class SelectInput extends Component {
  constructor(props) {
    super(props);
    this[props.name] = createRef();
    this.state = {
      value: props.value
    };
  }
  componentDidMount() {
    this[this.props.name].current.value = this.props.value;
  }
  componentDidUpdate() {
    this[this.props.name].current.value = this.props.value;
  }
  render() {
    const { className, showName, name, handleChange, options } = this.props;
    return (
      <div className={"config_input " + className}>
        <span className="config_helper">{showName}</span>
        <select
          onChange={e => {
            console.log(e.currentTarget.value);
          }}
          ref={this[name]}
        >
          {options.map(option => (
            <option value={option.id}>{option.typeName}</option>
          ))}
        </select>
      </div>
    );
  }
}
