import React, { Component } from "react";
import { Item } from "./Item";
import { PLUGIN_DIR } from "../../constants";
import AddButton from "./AddButton";
import { Scrollbars } from "react-custom-scrollbars";
import SaveButton from "./SaveButton";
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
  changeProgress(progress) {
    this.setState(progress);
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
      <div className="config_input empty">
        {<AddButton addFunc={addFunc} />}
      </div>
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
        <Scrollbars style={{ width: 400, height: "70vh" }} autoHide>
          <div className={"config_items " + className}>
            {itemsFormated}{" "}
            {sendItems ? (
              <SaveButton
                sendItems={sendItems}
                progress={this.state.progress}
                changeProgress={this.changeProgress}
              />
            ) : (
              ""
            )}
          </div>
        </Scrollbars>
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
