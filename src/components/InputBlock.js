import React, { Component, Fragment } from "react";
import AddButton from "./AddButton";
import RemoveButton from "./RemoveButton";

export default class InputBlock extends Component {
  render() {
    const { id, addFunc, removeFunc, last, inputs } = this.props;
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
export { InputBlock };
