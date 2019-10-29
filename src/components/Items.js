import React, { Component, cloneElement, createRef, Fragment } from "react";
import { PLUGIN_DIR } from "../../constants";
import AddButton from "./AddButton";
import SaveButton from "./SaveButton";
import uniqid from "uniqid";
import InputBlock from "./InputBlock";
import PerfectScrollbar from "perfect-scrollbar";
export default class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: props.getItems ? false : true,
      progress: "Save"
    };
    //Initial item load
    if (props.getItems)
      props.getItems(items => {
        items.map(item => props.addFunc(item));
        this.setState({ loaded: true });
      });
    ////////////
    this.items = createRef();
  }
  componentDidMount() {
    new PerfectScrollbar(this.items.current, { wheelSpeed: 0.4 });
  }
  changeProgress = progress => {
    this.setState(progress);
  };
  render() {
    const {
      values,
      addFunc,
      removeFunc,
      changeFunc,
      inputs,
      sendItems,
      className
    } = this.props;
    let items = (
      <div className="config_input empty">
        {<AddButton addFunc={addFunc} />}
      </div>
    );

    if (values.length != 0) {
      /////Mapping all the values into items var
      items = values.map(value => {
        return (
          <InputBlock
            last={false}
            key={uniqid()}
            {...{ removeFunc, addFunc, changeFunc }}
            id={value.id}
            inputs={inputs.map(input => {
              return cloneElement(input, {
                ...input.props,
                value: value[input.props.name],
                type: value.type,
                key: uniqid(),
                parentId: value.id,
                handleChange: (name, newValue) => {
                  changeFunc(value.id, { [name]: newValue });
                }
              });
            })}
          />
        );
      });
      //////////

      ////Adding las prop to the last item
      const lastInput = items[items.length - 1];
      items[items.length - 1] = cloneElement(lastInput, {
        ...lastInput.props,
        last: true
      });
      //////
    }
    const content = this.state.loaded ? (
      <Fragment>{items}</Fragment>
    ) : (
      <img
        src={PLUGIN_DIR + "/src/imgs/loading.svg"}
        alt=""
        className="loadingAnimation"
      />
    );
    return (
      <div className={"config_items " + className}>
        <div className="config_itemWrapper" ref={this.items}>
          {content}
        </div>
        {sendItems ? (
          <SaveButton
            items={values}
            sendItems={sendItems}
            progress={this.state.progress}
            changeProgress={this.changeProgress}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
