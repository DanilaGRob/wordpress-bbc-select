import React, { Component, Fragment } from "react";
import TextInput from "./Inputs/TextInput";
import TextAreaInput from "./Inputs/TextAreaInput";
import ImageInput from "./Inputs/ImageInput";
import SelectInput from "./Inputs/SelectInput";
import uniqid from "uniqid";
import AddButton from "./AddButton";
import RemoveButton from "./RemoveButton";
import InputList from "./Inputs/InputList";

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
        case "INPUTLIST": {
          return (
            <InputList
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
      <div className="config_item">
        {inputs}
        <div className="config_buttons">
          {last ? (
            <Fragment>
              <AddButton addFunc={addFunc} />
              <RemoveButton removeFunc={removeFunc} id={id} />
            </Fragment>
          ) : (
            <RemoveButton removeFunc={removeFunc} id={id} />
          )}
        </div>
      </div>
    );
  }
}
export { Item };
