import { connect } from "react-redux";
import FrontEndApp from "../components/FrontEndApp";
import { loadFood } from "../redux-actions";
const mapDispatchToProps = (dispatch, props) => ({
  loadFood: () => dispatch(loadFood())
});
const mapStateToProps = state => ({
  loading: state.Food.loading
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontEndApp);
