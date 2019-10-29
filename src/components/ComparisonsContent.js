import React, { Component } from "react";

export default class ComparisonsContent extends Component {
  render() {
    const { annualCons } = this.props;
    const comparisons = this.props.comparisons.map(comparison => {
      console.log(annualCons / comparison.amount);
      const compAmount =
        Math.round(annualCons / comparison.amount) > 1
          ? Math.round(annualCons / comparison.amount)
          : Math.round((annualCons / comparison.amount) * 10) / 10;
      if (compAmount != 0)
        return (
          <div className="comparison">
            <img src={comparison.image} alt="" />
            <span className="comparisonDesc">
              {comparison.description}
              <span className="bold">
                {compAmount.toLocaleString() + comparison.units}
              </span>
            </span>
          </div>
        );
      else return "";
    });
    return <div className="comparisonsContent">{comparisons}</div>;
  }
}
