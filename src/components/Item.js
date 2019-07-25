import React, { Component, Fragment } from "react";
import { PLUGIN_DIR } from "../../constants";
import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";
import ImageInput from "./ImageInput";
import SelectInput from "./SelectInput";
import uniqid from "uniqid";

const getAddButton = addFunc => (
  <img
    src={PLUGIN_DIR + "/src/imgs/add.svg"}
    className="config_addButton clickable"
    onClick={addFunc}
  />
);
const getRemoveButton = (removeFunc, id) => (
  <img
    src={PLUGIN_DIR + "/src/imgs/remove.svg"}
    className="config_addButton clickable"
    onClick={() => removeFunc(id)}
  />
);

export default class Item extends Component {
  handleChange = (name, value) => {
    const { changeFunc, id } = this.props;
    changeFunc(id, { [name]: value });
  };
  render() {
    const { id, addFunc, removeFunc, last, assets } = this.props;
    const inputs = assets.map(asset => {
      const id = uniqid();
      switch (asset.inputType) {
        case "TEXT": {
          return (
            <TextInput
              {...asset}
              value={this.props[asset.name]}
              handleChange={this.handleChange}
              id={id}
              key={id}
            />
          );
        }
        case "SELECT": {
          return (
            <SelectInput
              {...asset}
              value={this.props[asset.name]}
              handleChange={this.handleChange}
              id={id}
              key={id}
            />
          );
        }
        case "IMAGE": {
          return (
            <ImageInput
              {...asset}
              value={this.props[asset.name]}
              handleChange={this.handleChange}
              key={id}
              id={id}
            />
          );
        }
        case "TEXTAREA": {
          return (
            <TextAreaInput
              {...asset}
              value={this.props[asset.name]}
              handleChange={this.handleChange}
              key={id}
              id={id}
            />
          );
        }
      }
    });
    return (
      <Fragment>
        {inputs}
        <div className="config_buttons">
          {last ? (
            <Fragment>
              {getAddButton(addFunc)}
              {getRemoveButton(removeFunc, id)}
            </Fragment>
          ) : (
            getRemoveButton(removeFunc, id)
          )}
        </div>
      </Fragment>
    );
  }
}
export { Item, getAddButton };
