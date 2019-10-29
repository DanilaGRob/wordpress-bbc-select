const initialState = {
  types: [],
  loading: true
};

export default (state = initialState, { type, props }) => {
  switch (type) {
    case "ADD_TYPE": {
      const { id, units, typeName, color, main } = props;
      const { types } = state;
      return {
        ...state,
        types: [...types, { id, units, typeName, color, main }]
      };
    }
    case "REMOVE_TYPE": {
      const { id } = props;
      const { types } = state;
      return { ...state, types: types.filter(t => t.id != id) };
    }
    case "CHANGE_TYPE": {
      const { id, value } = props;
      const { types } = state;
      for (let [key, value] of Object.entries(value)) {
        const newState = {
          ...state,
          types: types.map(t =>
            t.id == id ? { ...t, [key]: value !== "" ? value : null } : t
          )
        };
        return newState;
      }
    }
    case "TYPE_LOADING_FINISHED": {
      const { items } = props;
      return {
        ...state,
        loading: false,
        types: items
      };
    }
    default:
      return state;
  }
};
