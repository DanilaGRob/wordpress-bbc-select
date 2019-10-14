const initialState = { items: [], loading: true };

export default (state = initialState, { type, props }) => {
  switch (type) {
    case "ADD_COMP": {
      const { id, image, amount, type, description, units } = props;
      const { items } = state;
      return {
        ...state,
        items: [...items, { id, image, amount, type, description, units }]
      };
    }
    case "COMPS_LOADING_FINISHED": {
      const { items } = props;
      return {
        ...state,
        items,
        loading: false
      };
    }
    case "REMOVE_COMP": {
      const { id } = props;
      const { items } = state;
      return { ...state, items: items.filter(t => t.id != id) };
    }
    case "CHANGE_COMP": {
      const { id, value } = props;
      const { items } = state;
      for (let [key, value] of Object.entries(value)) {
        return {
          ...state,
          items: items.map(t =>
            t.id == id ? { ...t, [key]: value !== "" ? value : null } : t
          )
        };
      }
    }
    default:
      return state;
  }
};
