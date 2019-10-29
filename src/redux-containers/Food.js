import { connect } from "react-redux";
import Items from "../components/Items";
import { sendFood } from "../dbConnection/sendToDb";
import { getFood } from "../dbConnection/getFromDB";
import { addFood, removeFood, changeFood } from "../redux-actions/index";
import ImageInput from "../components/Inputs/ImageInput";
import TextAreaInput from "../components/Inputs/TextAreaInput";
import InputList from "../components/Inputs/InputList";
import TextInput from "../components/Inputs/TextInput";
import React from "react";
import SelectInput from "../components/Inputs/SelectInput";
const mapStateToProps = state => ({
  values: state.Food.items,
  inputs: [
    <TextInput
      name="name"
      helperText="Enter a name of a food or drink"
      className="config_name"
    />,
    <SelectInput
      name="type"
      className="config_food_type_select"
      helperText="Please select a type"
      options={[
        {
          id: "drinks",
          value: "gėrimai",
          typeName: "drinks"
        },
        {
          id: "fruit & veg",
          value: "vaisiai ir daržovės",
          typeName: "fruit & veg"
        },
        {
          id: "proteins",
          value: "proteinai",
          typeName: "proteins"
        },
        {
          id: "starches",
          value: "krakmolai",
          typeName: "starches"
        },
        {
          id: "chocolates",
          value: "šokoladas",
          typeName: "chocolates"
        },
        {
          id: "milks",
          value: "pienas",
          typeName: "milks"
        }
      ]}
    />,
    <ImageInput
      name="image"
      helperText="Choose an image"
      className="config_foodImage"
    />,
    <TextAreaInput
      name="description"
      helperText="Enter a description"
      autoSize={false}
      className="config_foodDescription"
    />,
    <InputList
      name="types"
      helperText="Please select the types"
      className="config_inputList"
    />
  ]
});
const mapDispatchToProps = dispatch => ({
  addFunc: itemObj => dispatch(addFood(itemObj)),
  removeFunc: id => dispatch(removeFood(id)),
  changeFunc: (id, value) => dispatch(changeFood(id, value)),
  sendItems: (items, callback) => sendFood(items, callback),
  getItems: callback => getFood(callback)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
