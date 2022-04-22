const initialState = [];

const addToCart = (state = initialState, action) => {
  if (action.type == "ADDTOCART") {
    return [...state, action.payload];
  }
  if (action.type == "EMPTYCART") {
    return [];
  }
  return state;
};

export default addToCart;
