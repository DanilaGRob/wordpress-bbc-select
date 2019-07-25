import { connect } from "react-redux";
import Items from "../components/Items";
import { sendComps } from "../dbConnection/sendToDb";
import { getComps, getTypes } from "../dbConnection/getFromDB";
import { addComp, removeComp, changeComp } from "../redux-actions/index";
const mapStateToProps = state => ({
  items: state.Comparisons,
  assets: [
    {
      name: "image",
      showName: "Select an image",
      inputType: "IMAGE",
      className: "config_image"
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
      options: state.Types
    },
    {
      name: "description",
      showName: "Enter a description",
      inputType: "TEXTAREA",
      className: "config_textarea"
    }
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
