import { connect } from "react-redux";
import React from "react";
import Items from "../components/Items";
import { sendTypes } from "../dbConnection/sendToDb";
import { getTypes } from "../dbConnection/getFromDB";
import { addType, removeType, changeType } from "../redux-actions/index";
import TextInput from "../components/Inputs/TextInput";
import CheckboxInput from "../components/Inputs/CheckboxInput";
import ColorInput from "../components/Inputs/ColorInput";
const mapStateToProps = state => ({
  values: state.Types.types,
  inputs: [
    <TextInput name="typeName" helperText="Enter a type name" className="" />,
    <TextInput
      name="units"
      helperText="Enter type units"
      className="config_unitsInput"
    />,
    <CheckboxInput name="main" helperText="Main" className="config_checkbox" />,
    <ColorInput name="color" pickerClass={state.Types.pickerClass} />
  ]
});
const mapDispatchToProps = dispatch => ({
  addFunc: itemObj => dispatch(addType(itemObj)),
  removeFunc: id => dispatch(removeType(id)),
  changeFunc: (id, value) => dispatch(changeType(id, value)),
  sendItems: (items, callback) => sendTypes(items, callback),
  getItems: callback => getTypes(callback)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
