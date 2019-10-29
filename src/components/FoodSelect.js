import React, { Component, Fragment } from "react";
import SelectInputF from "./Inputs/SelectInputF";
import TypesSelect from "../redux-containers/TypesSelect";
import FoodSelectContent from "../redux-containers/FoodSelectContent";
export default class FoodSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      food: null,
      multiplier: null
    };
  }

  render() {
    const selected =
      this.state.food != null && this.state.multiplier != null ? true : false;
    return (
      <Fragment>
        <div className="foodSelect">
          <TypesSelect
            helperText="Which food would you like?"
            emptyError="- Select food or drink -"
            ref={this.foodType}
            value={this.state.food}
            onChange={value => this.setState({ food: value })}
          />
          <SelectInputF
            helperText="How often do you have it?"
            emptyError="- Select how often -"
            ref={this.frequency}
            value={this.state.multiplier}
            onChange={value => this.setState({ multiplier: value })}
            options={[
              {
                name: "Twice a day or more",
                id: 2
              },
              {
                name: "Once a day",
                id: 1
              },
              {
                name: "3-5 times a week",
                id: 0.57
              },
              {
                name: "1-2 times a week",
                id: 0.2142
              },
              {
                name: "Never",
                id: 0
              }
            ]}
          />
        </div>
        {selected ? (
          <FoodSelectContent
            foodId={this.state.food}
            multiplier={this.state.multiplier}
          />
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}
