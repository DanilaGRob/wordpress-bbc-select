const initialState = [];

export default (state = initialState, { type, props }) => {
  switch (type) {
    case "ADD_COMP": {
      const { id, image, amount, type, description } = props;
      return [...state, { id, image, amount, type, description }];
    }
    case "REMOVE_COMP": {
      const { id } = props;
      return state.filter(t => t.id != id);
    }
    case "CHANGE_COMP": {
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
