export const addType = ({ id = uniqid(), units = null, typeName = null }) => ({
  type: "ADD_TYPE",
  props: { id, units, typeName }
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
  description = null
}) => ({
  type: "ADD_COMP",
  props: { id, image, amount, type, description }
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
  image = null,
  description = null,
  types = []
}) => ({
  type: "ADD_FOOD",
  props: { id, image, description, types }
});
export const removeFood = id => ({
  type: "REMOVE_FOOD",
  props: { id }
});
export const changeFood = (id, value) => ({
  type: "CHANGE_FOOD",
  props: { id, value }
});
