import uniqid from "uniqid";
export const addType = ({ id = uniqid(), units = null, typeName = null }) => ({
  type: "ADD_TYPE",
  props: { id, units, typeName }
});
export const removeType = id => ({
  type: "REMOVE_TYPE",
  props: { id }
});
export const changeType = (id, units, typeName) => ({
  type: "CHANGE_TYPE",
  props: { id, units, typeName }
});
export const addComp = ({
  id = uniqid(),
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
export const changeType = (id, image, amount, type, description) => ({
  type: "CHANGE_TYPE",
  props: { id, image, amount, type, description }
});