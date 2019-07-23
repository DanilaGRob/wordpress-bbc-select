const initialState = [];

export default (state = initialState, { type, props }) => {
  switch (type) {
    case "ADD_COMP": {
      const { id, name, image, amount, type, description } = props;
      return [...state, { id, name, image, amount, type, description }];
    }
    case "REMOVE_COMP": {
      const { id } = props;
      return state.filter(t => t.id != id);
    }
    case "CHANGE_COMP": {
      const { id, name, image, amount, type, description } = props;
      return state.map(t =>
        t.id == id ? { ...t, name, image, amount, type, description } : t
      );
    }
    default:
      return state;
  }
};
