import React, { Component } from "react";

export default class SaveButton extends Component {
  render() {
    const { progress, changeProgress } = this.props;
    return (
      <div
        className="clickable config_saveButton btn blue"
        onClick={() => {
          changeProgress({
            progress: <img src={PLUGIN_DIR + "/src/imgs/loading_white.svg"} />
          });
          sendItems(items, () => {
            changeProgress({
              progress: <img src={PLUGIN_DIR + "/src/imgs/done.svg"} />
            });
            setTimeout(() => {
              changeProgress({
                progress: "Save"
              });
            }, 1000);
          });
        }}
      >
        <span>{progress}</span>
      </div>
    );
  }
}
