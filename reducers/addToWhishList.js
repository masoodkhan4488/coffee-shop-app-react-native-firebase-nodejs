const initialState = [];

const addToWhishList = (state = initialState, action) => {
  if (action.type == "ADDTOWHISHLIST") {
    return [...state, action.payload];
  }
  if (action.type == "EMPTYWHISHLIST") {
    return [];
  }
  return state;
};

export default addToWhishList;
