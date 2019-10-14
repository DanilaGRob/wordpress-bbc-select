import React, { Component, createRef, Fragment } from "react";
import { TwitterPicker } from "react-color";
import $ from "jquery";
export default class ColorInput extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();
    this.picker = createRef();
    this.colorBox = createRef();
    this.state = {
      pickerClass: "invisible",
      value: props.value ? props.value : "#FFFFFF"
    };
  }
  componentWillMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }
  handleClick = e => {
    const { handleChange, name } = this.props;
    const { pickerClass } = this.state;
    const picker = $(this.input.current).children(".colorInputPicker")[0];
    if (picker.contains(e.target)) {
      return;
    }
    if (pickerClass != "invisible") {
      handleChange(name, this.picker.current.state.hex);
    }
  };
  render() {
    const { pickerClass, value } = this.state;
    return (
      <div className="config_input" ref={this.input}>
        <div
          className="colorInput"
          onClick={() => {
            this.setState({ pickerClass: "" });
          }}
          style={{ backgroundColor: value }}
          ref={this.colorBox}
        />
        <TwitterPicker
          color={value}
          className={"colorInputPicker " + pickerClass}
          ref={this.picker}
          onChange={color => {
            this.colorBox.current.style.backgroundColor = color.hex;
          }}
        />
      </div>
    );
  }
}
