import { CART_ITEMS, CART_TOTAL } from "../constants";

export default (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ITEMS:
      return { ...state, cartItems: action.payload };
    case CART_TOTAL:
      return { ...state, cartTotal: action.payload };
    default:
      return state;
  }
};
