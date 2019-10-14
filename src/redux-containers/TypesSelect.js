import { connect } from "react-redux";
import SelectInputF from "../components/Inputs/SelectInputF";
import { loadTypes } from "../redux-actions";
const mapStateToProps = state => ({
  options: state.Food.items
});
export default connect(mapStateToProps)(SelectInputF);
