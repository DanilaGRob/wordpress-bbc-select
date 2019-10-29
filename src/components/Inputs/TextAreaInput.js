import React, { Component, createRef } from "react";
import autosize from "autosize";
export default class TextAreaInput extends Component {
  constructor(props) {
    super(props);
    this[props.name] = createRef();
    this.state = {
      value: props.value
    };
  }
  componentDidMount() {
    this[this.props.name].current.value = this.props.value;
    if (this.props.autoSize) {
      autosize(this[this.props.name].current);
      autosize.update(this[this.props.name].current);
    }
  }
  componentDidUpdate() {
    this[this.props.name].current.value = this.props.value;
    if (this.props.autosize) autosize.update(this[this.props.name].current);
  }
  render() {
    const { className, helperText, name, handleChange } = this.props;
    return (
      <div className={"config_input " + className}>
        <span className="config_helper">{helperText}</span>
        <textarea
          rows="3"
          onBlur={e => handleChange(name, e.currentTarget.value)}
          ref={this[name]}
        />
      </div>
    );
  }
}
