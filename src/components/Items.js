import React, { Component, Fragment } from "react";
import { Item, getAddButton } from "./Item";
import { sendTypes } from "../dbConnection/sendToDb";
import { getTypes } from "../dbConnection/getFromDB";
import { PLUGIN_DIR } from "../../constants";
export default class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      progress: "Save"
    };
    props.getItems(items => {
      items.map(item => props.addFunc(item));
      this.setState({ loaded: true });
    });
  }
  render() {
    const {
      items,
      addFunc,
      removeFunc,
      changeFunc,
      assets,
      sendItems,
      className
    } = this.props;

    let itemsFormated = (
      <div class="config_input empty">{getAddButton(addFunc)}</div>
    );
    if (items.length != 0) {
      itemsFormated = items.map(item => {
        return (
          <Item
            {...item}
            {...{ assets, removeFunc, addFunc, changeFunc }}
            last={false}
            key={item.id}
            className={className}
          />
        );
      });
      const props = itemsFormated[itemsFormated.length - 1].props;
      itemsFormated[itemsFormated.length - 1] = (
        <Item {...props} last={true} key={props.id} />
      );
    }
    if (this.state.loaded)
      return (
        <div className={"config_items " + className}>
          {itemsFormated}
          <div
            className="clickable config_saveButton btn blue"
            onClick={() => {
              this.setState({
                progress: (
                  <img src={PLUGIN_DIR + "/src/imgs/loading_white.svg"} />
                )
              });
              sendItems(items, () => {
                this.setState({
                  progress: <img src={PLUGIN_DIR + "/src/imgs/done.svg"} />
                });
                setTimeout(() => {
                  this.setState({
                    progress: "Save"
                  });
                }, 1000);
              });
            }}
          >
            <span>{this.state.progress}</span>
          </div>
        </div>
      );
    else
      return (
        <div className="config_items">
          <img
            src={PLUGIN_DIR + "/src/imgs/loading.svg"}
            alt=""
            className="loadingAnimation"
          />
        </div>
      );
  }
}
