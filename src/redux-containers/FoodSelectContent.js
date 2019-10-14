import { connect } from "react-redux";
import FoodSelectContent from "../components/FoodSelectContent";
import { loadTypes, loadComps } from "../redux-actions";
const mapStateToProps = state => ({
  food: state.Food.items,
  loading: state.Types.loading,
  types: state.Types.types,
  loadingComps: state.Comparisons.loading,
  comparisons: state.Comparisons.items
});
const mapDispatchToProps = (dispatch, props) => ({
  loadTypes: () => dispatch(loadTypes()),
  loadComps: () => dispatch(loadComps())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodSelectContent);
