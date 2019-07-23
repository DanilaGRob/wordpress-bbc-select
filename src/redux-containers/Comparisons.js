import { connect } from "react-redux";
import Items from "../components/Items";
import { sendComps } from "../dbConnection/sendToDb";
import { getTypes } from "../dbConnection/getFromDB";
import { addComp, removeComp, changeComp } from "../redux-actions/index";
const assets = [
  {
    name: "typeName",
    showName: "Name",
    inputType: "TEXT",
    className: ""
  },
  {
    name: "units",
    showName: "Units",
    inputType: "TEXT",
    className: "config_unitsInput"
  }
];
const mapStateToProps = state => ({
  items: state.Comparisons,
  assets
});
const mapDispatchToProps = dispatch => ({
  addFunc: itemObj => dispatch(addComp(itemObj)),
  removeFunc: id => dispatch(removeComp(id)),
  changeFunc: (id, image, amount, type, description) =>
    dispatch(changeType(id, image, amount, type, description)),
  sendItems: (items, callback) => sendComps(items, callback),
  getItems: callback => getTypes(callback)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
