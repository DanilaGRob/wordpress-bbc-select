import { connect } from "react-redux";
import Items from "../components/Items";
import { sendFood } from "../dbConnection/sendToDb";
import { getFood } from "../dbConnection/getFromDB";
import { addFood, removeFood, changeFood } from "../redux-actions/index";

const mapStateToProps = state => ({
  items: state.Food,
  assets: [
    {
      name: "image",
      showName: "Choose an image",
      inputType: "IMAGE",
      className: "coonfig_foodImage"
    },
    {
      name: "description",
      showName: "Enter a discription",
      inputType: "TEXTAREA",
      className: "coonfig_foodDescription"
    },
    {
      name: "types",
      showName: "Please select the types",
      inputType: "INPUTLIST",
      className: "config_inputList"
    }
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
