import React, { Component, createRef } from "react";
export default class ImageInput extends Component {
  constructor(props) {
    super(props);
    this[props.name] = createRef();
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
    const { className, showName, name } = this.props;
    return (
      <div className={"config_input " + className}>
        <span className="config_helper">{showName}</span>
        <div
          className="config_imageSelect"
          onClick={() => {
            this.frame.open();
            this.frame.on("select", () => {
              const attachment = this.frame
                .state()
                .get("selection")
                .first()
                .toJSON();
              this[name].current.style.backgroundImage = `url("${
                attachment.url
              }")`;
              console.log(this[name].current.style);
            });
          }}
          ref={this[name]}
        />
      </div>
    );
  }
}
