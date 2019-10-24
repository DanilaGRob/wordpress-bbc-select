import React, { Component, Fragment } from "react";
import { PLUGIN_DIR } from "../../constants";
import uniqid from "uniqid";
import ComparisonsContent from "./ComparisonsContent";
import Chart from "./Chart";
export default class FoodSelectContent extends Component {
  constructor(props) {
    super(props);
    props.loadTypes();
    props.loadComps();
  }
  mainFoodType = null;
  getAnnualConsumption(amountPerServing, multiplier) {
    const amount = parseFloat(amountPerServing) * parseFloat(multiplier) * 365;
    if (amount > 1) return Math.round(amount);
    return Math.round(amount * 10) / 10;
  }
  getSelectedType(types, typeId) {
    return types.find(type => type.id == typeId)
      ? types.find(type => type.id == typeId)
      : { units: "", typeName: "" };
  }
  getContent(mainFoodComps, secondaryFoodComps, selectedFood) {
    const { multiplier, types, comparisons } = this.props;
    selectedFood.types.map(type => {
      const { units, color, typeName, main, id } = this.getSelectedType(
        types,
        type.type
      );
      const annualCons = this.getAnnualConsumption(type.amount, multiplier);
      const formatedComparisons = comparisons.filter(
        comparison => comparison.type == type.type
      );
      const comparison = formatedComparisons[0];
      if (parseInt(main) && formatedComparisons.length != 0) {
        this.mainFoodType = selectedFood.types.find(type => type.type == id);
        mainFoodComps.push(
          <Fragment key={uniqid()}>
            <div className="typeDescription">
              {`Over an entire year your consumption of ${selectedFood.name.toLowerCase()} is contributing `}
              <span
                style={{ color }}
              >{`${annualCons.toLocaleString()}${units}`}</span>
              {` to your annual ${typeName.toLowerCase()} emissions.`}
            </div>
            <ComparisonsContent
              comparisons={formatedComparisons}
              annualCons={annualCons}
            />
          </Fragment>
        );
      } else if (comparison) {
        const compAmount =
          Math.round(annualCons / comparison.amount) > 1
            ? Math.round(annualCons / comparison.amount)
            : Math.round((annualCons / comparison.amount) * 10) / 10;
        secondaryFoodComps.push(
          <Fragment key={uniqid()}>
            <span className="bold secondaryDescription">
              Your consumption of{" " + selectedFood.name.toLowerCase() + " "}
              also uses
            </span>
            <div className="comparison">
              <img src={comparison.image} />
              <span
                className="bold"
                style={{ color }}
              >{`${annualCons.toLocaleString()}${units}`}</span>
              {", "}
              equal to{" " + comparison.description}
              <span className="bold">
                {compAmount.toLocaleString() + comparison.units}
              </span>
            </div>
          </Fragment>
        );
      }
    });
  }
  render() {
    const { food, foodId, loading, loadingComps } = this.props;
    const mainFoodComps = [];
    const secondaryFoodComps = [];
    const selectedFood = food.find(food => food.id == foodId);
    if (!loading && !loadingComps) {
      this.getContent(mainFoodComps, secondaryFoodComps, selectedFood);
      return (
        <div className="foodSelectContent">
          <div className="iconContainer">
            <img src={selectedFood.image} alt="" className="icon" />
            <img src={PLUGIN_DIR + "/src/imgs/shadow.svg"} className="shadow" />
          </div>
          <span className="description">{selectedFood.description}</span>
          {mainFoodComps}
          {secondaryFoodComps}
          <Chart
            data={food
              .filter(food => food.type == selectedFood.type)
              .map(food => {
                return {
                  amount: parseFloat(
                    food.types.find(type => type.type == this.mainFoodType.type)
                      .amount
                  ),
                  name: food.name,
                  image: food.image,
                  type: food.type,
                  selected: food.id === selectedFood.id
                };
              })}
          />
        </div>
      );
    } else
      return (
        <div className="FoodSelectContent">
          <img
            src={PLUGIN_DIR + "/src/imgs/loading.svg"}
            className="foodLoader"
          />
        </div>
      );
  }
}
