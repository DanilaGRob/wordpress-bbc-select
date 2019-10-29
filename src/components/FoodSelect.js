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
            helperText="Kokio produkto norėtumėt?"
            emptyError="- Išsirinkite produktą arba gėrimą -"
            ref={this.foodType}
            value={this.state.food}
            onChange={value => this.setState({ food: value })}
          />
          <SelectInputF
            helperText="Kaip dažnai jį vartojate?"
            emptyError="- Išsirinkite dažnumą -"
            ref={this.frequency}
            value={this.state.multiplier}
            onChange={value => this.setState({ multiplier: value })}
            options={[
              {
                name: "2 arba daugiau kartų per dieną",
                id: 2
              },
              {
                name: "Kartą per dieną",
                id: 1
              },
              {
                name: "3-5 kartus per savaitę",
                id: 0.57
              },
              {
                name: "1-2 kartus per savaitę",
                id: 0.2142
              },
              {
                name: "Niekada",
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
