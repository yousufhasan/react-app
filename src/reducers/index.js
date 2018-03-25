import { combineReducers } from "redux";
import productReducer from "./productReducer";
import customerReducer from "./customerReducer";
import cartReducer from "./cartReducer";
export default combineReducers({
  product: productReducer,
  customer: customerReducer,
  cart: cartReducer
});
