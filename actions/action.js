export const addToCart = (items) => {
  return {
    type: "ADDTOCART",
    payload: items,
  };
};

export const addToWhishList = (items) => {
  return {
    type: "ADDTOWHISHLIST",
    payload: items,
  };
};

export const cartTotal = (total) => {
  return {
    type: "CARTTOTAL",
    payload: total,
  };
};

export const emptyCartTotal = () => {
  return {
    type: "EMPTYCART",
  };
};

export const emptyWhishListTotal = () => {
  return {
    type: "EMPTYWHISHLIST",
  };
};
