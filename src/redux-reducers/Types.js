const initialState = [];

export default (state = initialState, { type, props }) => {
  switch (type) {
    case "ADD_TYPE": {
      const { id, units, typeName } = props;
      return [...state, { id, units, typeName }];
    }
    case "REMOVE_TYPE": {
      const { id } = props;
      return state.filter(t => t.id != id);
    }
    case "CHANGE_TYPE": {
      const { id, units, typeName } = props;
      return state.map(t => (t.id == id ? { ...t, units, typeName } : t));
    }
    default:
      return state;
  }
};
