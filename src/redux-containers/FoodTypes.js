import { connect } from "react-redux";
import Items from "../components/Items";
import { addFoodT, removeFoodT, changeFoodT } from "../redux-actions/index";
import TextInput from "../components/Inputs/TextInput";
import SelectInput from "../components/Inputs/SelectInput";
import React from "react";
const mapStateToProps = state => ({
  inputs: [
    <TextInput
      name="amount"
      className="config_food_amount"
      helperText="Please enter an amount"
    />,
    <SelectInput
      name="type"
      className="config_food_type"
      helperText="Please select a type"
      options={state.Types.types}
    />
  ]
});
const mapDispatchToProps = (dispatch, props) => ({
  addFunc: itemObj => dispatch(addFoodT({ ...itemObj, foodId: props.foodId })),
  removeFunc: id => dispatch(removeFoodT(id)),
  changeFunc: (id, value) => dispatch(changeFoodT(id, value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
