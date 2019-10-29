import React, { Component, createRef } from "react";
export default class TextInput extends Component {
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
    const {
      className,
      helperText,
      name,
      handleChange,
      type,
      options
    } = this.props;
    const typeObj = options ? options.find(option => option.id == type) : "";
    const units = typeObj ? " for every " + typeObj.units : "";
    return (
      <div className={"config_input " + className}>
        <span className="config_helper">{helperText + units}</span>
        <input
          type="text"
          onBlur={e => handleChange(name, e.currentTarget.value)}
          ref={this[name]}
        />
      </div>
    );
  }
}
