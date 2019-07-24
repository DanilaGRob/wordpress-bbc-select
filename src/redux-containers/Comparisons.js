import { connect } from "react-redux";
import Items from "../components/Items";
import { sendComps } from "../dbConnection/sendToDb";
import { getComps, getTypes } from "../dbConnection/getFromDB";
import { addComp, removeComp, changeComp } from "../redux-actions/index";
const assets = [
  {
    name: "image",
    showName: "Select an image",
    inputType: "IMAGE",
    className: ""
  },
  {
    name: "amount",
    showName: "Enter an amount of contribution",
    inputType: "TEXT",
    className: "config_contribution"
  },
  {
    name: "type",
    showName: "Choose a type",
    inputType: "SELECT",
    className: "config_type",
    getOptions: getTypes
  },
  {
    name: "description",
    showName: "Enter a description",
    inputType: "TEXTAREA",
    className: "config_type"
  }
];
const mapStateToProps = state => ({
  items: state.Comparisons,
  assets
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
