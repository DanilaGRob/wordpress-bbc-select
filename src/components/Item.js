import React, { Component, createRef, Fragment } from "react";
import { PLUGIN_DIR } from "../../constants";
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
  constructor(props) {
    super(props);
    this.state = {
      inputs: []
    };
    props.assets.map(a => {
      this[a.name] = createRef();
    });
  }
  updateTheComponent() {
    const { assets } = this.props;

    assets.map(a => {
      switch (a.inputType) {
        case "TEXT": {
          this[a.name].current.value = this.props[a.name]
            ? this.props[a.name]
            : "";
          break;
        }
      }
    });
  }
  componentWillMount() {
    const inputs = [];
    const { assets } = this.props;
    assets.map(a => {
      switch (a.inputType) {
        case "TEXT": {
          inputs.push(
            <div className={"config_input " + a.className} key={uniqid()}>
              <span className="config_helper">{a.showName}</span>
              <input
                type="text"
                onBlur={this.handleChange}
                ref={this[a.name]}
              />
            </div>
          );
          break;
        }
      }
    });
    this.setState({ inputs });
  }
  componentDidMount() {
    this.updateTheComponent();
  }
  handleChange = () => {
    const { changeFunc, id, assets } = this.props;
    const inputs = assets.map(a =>
      this[a.name].current.value == "" ? null : this[a.name].current.value
    );
    changeFunc(id, ...inputs);
  };
  render() {
    const { id, addFunc, removeFunc, last } = this.props;
    const inputs = [];

    return (
      <Fragment>
        {this.state.inputs}
        <div className="config_input">
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
