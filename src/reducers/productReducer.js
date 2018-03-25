import { PRODUCT_LIST } from "../constants";

export default (state = { productList: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST:
      return { ...state, productList: action.payload };
    default:
      return state;
  }
};
