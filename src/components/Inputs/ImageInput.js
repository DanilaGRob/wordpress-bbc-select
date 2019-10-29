import React, { Component, createRef } from "react";
import { PLUGIN_DIR } from "../../../constants";
export default class ImageInput extends Component {
  constructor(props) {
    super(props);
    this[props.name] = createRef();
    this.state = {
      style: {
        backgroundImage: props.value
          ? `url("${PLUGIN_DIR}/src/imgs/uploadImage.svg")`
          : `url("${props.value}")`
      }
    };
  }
  frame = wp.media({
    frame: "select",
    title: "Select an image",
    button: {
      text: "Use this image"
    },
    multiple: false
  });
  render() {
    const { className, helperText, name, handleChange, value } = this.props;
    const style = !value
      ? {
          backgroundImage: `url("${PLUGIN_DIR}/src/imgs/uploadImage.svg")`
        }
      : { backgroundImage: `url("${value}")`, border: "none" };
    return (
      <div className={"config_input " + className}>
        <span className="config_helper">{helperText}</span>
        <div
          className="config_imageSelect clickable"
          style={style}
          onClick={() => {
            this.frame.open();
            this.frame.on("select", () => {
              const attachment = this.frame
                .state()
                .get("selection")
                .first()
                .toJSON();
              handleChange(name, attachment.url);
            });
          }}
          ref={this[name]}
        />
      </div>
    );
  }
}
