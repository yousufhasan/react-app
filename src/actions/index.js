import {
  CUSTOMER_LIST,
  PRODUCT_LIST,
  CURRENT_USER,
  CART_ITEMS,
  CART_TOTAL
} from "../constants";
import {
  getProductFromID,
  getProductDiscountPrice,
  getCartDiscountPrice,
  getCartAdditionalQuantity,
  applyRulesOnCartItem
} from "../utils";
import customers from "../local/customers.json";
import productData from "../local/products.json";
import CartItem from "../model/CartItem";
import Product from "../model/Product";

export const getAllCustomers = () => dispatch => {
  dispatch({ type: CUSTOMER_LIST, payload: customers });
  dispatch({ type: CURRENT_USER, payload: customers[0] });
};

export const changeCustomer = event => {
  return { type: CURRENT_USER, payload: event.target.value };
};

export const getCartForCurrentCustomer = current_customer => dispatch => {
  let total = 0;
  if (sessionStorage.getItem("cart") !== null) {
    let cartItems = JSON.parse(sessionStorage.getItem("cart"));
    cartItems.map((cartItem, index) => {
      cartItem.DiscountPrice =
        getCartDiscountPrice(
          cartItem.ProductID,
          current_customer,
          cartItem.Quantity
        ) || getProductDiscountPrice(cartItem.ProductID, current_customer);
      cartItem.BonusItems = getCartAdditionalQuantity(
        cartItem.ProductID,
        current_customer,
        cartItem.Quantity
      );
      cartItem.Price = getProductFromID(cartItem.ProductID).Price;
      cartItems[index] = cartItem;
      total += (cartItem.DiscountPrice || cartItem.Price) * cartItem.Quantity;
    });
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }
  dispatch({
    type: CART_ITEMS,
    payload: JSON.parse(sessionStorage.getItem("cart"))
  });
  dispatch({ type: CART_TOTAL, payload: total });
};

export const removeItemFromCart = (pID, current_customer) => dispatch => {
  let cartItems = JSON.parse(sessionStorage.getItem("cart"));
  let cartItem = cartItems.filter(({ ProductID }) => {
    return ProductID === pID;
  });
  cartItem = cartItem[0];
  const index = cartItems.indexOf(cartItem);
  cartItem.Quantity -= 1;
  if (cartItem.Quantity <= 0) {
    cartItems.splice(index, 1);
  } else {
    cartItem = applyRulesOnCartItem(cartItem, pID, current_customer);
    cartItems[index] = cartItem;
  }
  sessionStorage.setItem("cart", JSON.stringify(cartItems));
  dispatch(getCartForCurrentCustomer(current_customer));
};

export const addProductToCart = (pID, current_customer) => dispatch => {
  const product = getProductFromID(pID);
  if (sessionStorage.getItem("cart") === null) {
    sessionStorage.setItem("cart", JSON.stringify([]));
  }
  let cartItems = JSON.parse(sessionStorage.getItem("cart"));
  let cartItem = cartItems.filter(({ ProductID }) => {
    return ProductID === product.ID;
  });
  if (cartItem.length) {
    cartItem = cartItem[0];
    cartItem.Quantity += 1;
    cartItem = applyRulesOnCartItem(cartItem, product.ID, current_customer);
    const index = cartItems.indexOf(cartItem);
    cartItems[index] = cartItem;
  } else {
    const discountPrice =
      getCartDiscountPrice(product.ID, current_customer, 1) ||
      product.DiscountPrice;
    const bonusItems = getCartAdditionalQuantity(
      product.ID,
      current_customer,
      1
    );
    cartItem = new CartItem(
      product.ID,
      product.Name,
      product.Price,
      discountPrice,
      1,
      bonusItems
    );
    cartItems.push(cartItem);
  }
  sessionStorage.setItem("cart", JSON.stringify(cartItems));
  dispatch(getCartForCurrentCustomer(current_customer));
};

export const getProductsForCurrentCustomer = current_customer => {
  let products = [];
  productData.map((prod, index) => {
    const discountPrice = getProductDiscountPrice(prod.ID, current_customer);
    const product = new Product(prod.ID, prod.Name, prod.Price, discountPrice);
    products.push(product);
  });

  return { type: PRODUCT_LIST, payload: products };
};
