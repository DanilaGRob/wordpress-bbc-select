const initialState = {
  loading: true,
  saving: false,
  items: []
};

export default (state = initialState, { type, props }) => {
  switch (type) {
    case "ADD_FOOD": {
      const { id, image, name, description, types, type } = props;
      const { items } = state;
      const newState = {
        ...state,
        items: [...items, { id, image, name, description, type, types }]
      };

      return newState;
    }
    case "FOOD_LOADING_FINISHED": {
      const { items } = props;
      return {
        ...state,
        loading: false,
        items
      };
    }
    case "FOOD_SAVING_STARTED": {
      return {
        ...state,
        saving: true
      };
    }
    case "FOOD_SAVING_FINISHED": {
      return {
        ...state,
        saving: false
      };
    }
    case "REMOVE_FOOD": {
      const { id } = props;
      const { items } = state;
      const newState = {
        ...state,
        items: items.filter(t => t.id != id)
      };

      return newState;
    }
    case "CHANGE_FOOD": {
      const { id, value } = props;
      const { items } = state;
      for (let [key, value] of Object.entries(value)) {
        const newState = {
          ...state,
          items: items.map(t =>
            t.id == id ? { ...t, [key]: value != "" ? value : null } : t
          )
        };

        return newState;
      }
    }
    case "ADD_FOODT": {
      const { id, amount, type, foodId } = props;
      const { items } = state;
      const newState = {
        ...state,
        items: items.map(food => {
          let types = [...food.types];
          if (food.id == foodId) {
            types = [...types, { id, amount, type, foodId }];
          }
          return { ...food, types };
        })
      };

      return newState;
    }
    case "REMOVE_FOODT": {
      const { id } = props;
      const { items } = state;
      const newState = {
        ...state,
        items: items.map(food => {
          let types = [...food.types];
          types = types.filter(type => type.id != id);
          return { ...food, types };
        })
      };

      return newState;
    }
    case "CHANGE_FOODT": {
      const { id, value } = props;
      const { items } = state;
      for (let [key, value] of Object.entries(value)) {
        const newState = {
          ...state,
          items: items.map(food => {
            return {
              ...food,
              types: food.types.map(type => {
                return type.id == id ? { ...type, [key]: value } : type;
              })
            };
          })
        };
        return newState;
      }
    }
    default:
      return state;
  }
};
