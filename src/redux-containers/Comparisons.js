import { connect } from "react-redux";
import Items from "../components/Items";
import { sendComps } from "../dbConnection/sendToDb";
import { getComps } from "../dbConnection/getFromDB";
import { addComp, removeComp, changeComp } from "../redux-actions/index";
import ImageInput from "../components/Inputs/ImageInput";
import TextInput from "../components/Inputs/TextInput";
import SelectInput from "../components/Inputs/SelectInput";
import TextAreaInput from "../components/Inputs/TextAreaInput";
import React from "react";
const mapStateToProps = state => ({
  values: state.Comparisons.items,
  inputs: [
    <ImageInput
      name="image"
      helperText="Select an image"
      className="config_image"
    />,
    <TextInput
      name="amount"
      helperText="Amount"
      className="config_contribution"
      options={state.Types.types}
    />,
    <TextInput name="units" helperText="Units" className="config_compUnits" />,
    <SelectInput
      name="type"
      helperText="Choose a type"
      className="config_type"
      options={state.Types.types}
    />,
    <TextAreaInput
      name="description"
      autoSize={true}
      helperText="Enter a description"
      className="config_textarea"
    />
  ]
});
const mapDispatchToProps = dispatch => ({
  addFunc: itemObj => dispatch(addComp(itemObj)),
  removeFunc: id => dispatch(removeComp(id)),
  changeFunc: (id, value) => dispatch(changeComp(id, value)),
  sendItems: (items, callback) => sendComps(items, callback),
  getItems: callback => getComps(callback)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
