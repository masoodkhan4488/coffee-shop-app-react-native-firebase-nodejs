import { combineReducers } from "redux";
import addToCart from "./addToCart";
import addToWhishList from "./addToWhishList";

const rootReducer = combineReducers({
  addToCart,
  addToWhishList,
});

export default rootReducer;
