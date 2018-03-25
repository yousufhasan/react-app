import { CUSTOMER_LIST, CURRENT_USER } from "../constants";

export default (state = { customerList: [] }, action) => {
  switch (action.type) {
    case CUSTOMER_LIST:
      return { ...state, customerList: action.payload };
    case CURRENT_USER:
      return { ...state, currentCustomer: action.payload };
    default:
      return state;
  }
};
