import { connect } from "react-redux";
import Items from "../components/Items";
import { sendTypes } from "../dbConnection/sendToDb";
import { getTypes } from "../dbConnection/getFromDB";
import { addType, removeType, changeType } from "../redux-actions/index";
const assets = [
  {
    name: "typeName",
    showName: "Enter a type name",
    inputType: "TEXT",
    className: ""
  },
  {
    name: "units",
    showName: "Enter type units",
    inputType: "TEXT",
    className: "config_unitsInput"
  }
];
const mapStateToProps = state => ({
  items: state.Types,
  assets
});
const mapDispatchToProps = dispatch => ({
  addFunc: itemObj => dispatch(addType(itemObj)),
  removeFunc: id => dispatch(removeType(id)),
  changeFunc: (id, typeName, units) =>
    dispatch(changeType(id, units, typeName)),
  sendItems: (items, callback) => sendTypes(items, callback),
  getItems: callback => getTypes(callback)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
