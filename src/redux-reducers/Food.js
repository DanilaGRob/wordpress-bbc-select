const initialState = [];

export default (state = initialState, { type, props }) => {
  switch (type) {
    case "ADD_FOOD": {
      const { id, image, description, types } = props;
      return [...state, { id, image, description, types }];
    }
    case "REMOVE_FOOD": {
      const { id } = props;
      return state.filter(t => t.id != id);
    }
    case "CHANGE_FOOD": {
      const { id, value } = props;
      for (let [key, value] of Object.entries(value)) {
        return state.map(t =>
          t.id == id ? { ...t, [key]: value != "" ? value : null } : t
        );
      }
    }
    default:
      return state;
  }
};
