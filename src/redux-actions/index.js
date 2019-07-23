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
