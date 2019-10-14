import { getTypes, getFood, getComps } from "../dbConnection/getFromDB";
import { sendFood } from "../dbConnection/sendToDb";
export const addType = ({
  id = uniqid(),
  units = null,
  typeName = null,
  color = null,
  main = 0
}) => ({
  type: "ADD_TYPE",
  props: { id, units, typeName, color, main }
});
export const removeType = id => ({
  type: "REMOVE_TYPE",
  props: { id }
});
export const changeType = (id, value) => ({
  type: "CHANGE_TYPE",
  props: { id, value }
});
export const addComp = ({
  id,
  image = null,
  amount = null,
  type = null,
  description = null,
  units = null
}) => ({
  type: "ADD_COMP",
  props: { id, image, amount, type, description, units }
});
export const removeComp = id => ({
  type: "REMOVE_COMP",
  props: { id }
});
export const changeComp = (id, value) => ({
  type: "CHANGE_COMP",
  props: { id, value }
});
export const addFood = ({
  id,
  name = null,
  image = null,
  description = null,
  type = null,
  types = []
}) => ({
  type: "ADD_FOOD",
  props: { id, image, name, description, type, types }
});
export const removeFood = id => ({
  type: "REMOVE_FOOD",
  props: { id }
});
export const changeFood = (id, value) => ({
  type: "CHANGE_FOOD",
  props: { id, value }
});
export const addFoodT = ({ id, amount = null, type = null, foodId }) => ({
  type: "ADD_FOODT",
  props: { id, amount, type, foodId }
});
export const removeFoodT = id => ({
  type: "REMOVE_FOODT",
  props: { id }
});
export const changeFoodT = (id, value) => ({
  type: "CHANGE_FOODT",
  props: { id, value }
});
export const loadTypes = () => {
  return dispatch => {
    getTypes(items => {
      dispatch({
        type: "TYPE_LOADING_FINISHED",
        props: { items }
      });
    });
  };
};
export const loadFood = () => {
  return dispatch => {
    getFood(items => {
      dispatch({
        type: "FOOD_LOADING_FINISHED",
        props: { items }
      });
    });
  };
};
export const loadComps = () => {
  return dispatch => {
    getComps(items => {
      dispatch({
        type: "COMPS_LOADING_FINISHED",
        props: { items }
      });
    });
  };
};
export const saveFood = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "FOOD_SAVING_STARTED"
    });
    sendFood(getState().Food.items, () => {
      dispatch({
        type: "FOOD_SAVING_FINISHED"
      });
    });
  };
};
