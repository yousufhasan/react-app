import productData from "../local/products.json";
import rules from "../local/rules.json";

export const getProductFromID = pID => {
  return productData.filter(({ ID }) => {
    return ID === pID;
  })[0];
};
export const getProductDiscountPrice = (pID, current_customer) => {
  const discountOffer = rules.filter(
    ({ CustomerID, DiscountType, ProductID }) => {
      return (
        CustomerID === current_customer &&
        ProductID === pID &&
        DiscountType === "Price"
      );
    }
  );
  return discountOffer.length ? discountOffer[0].Price : null;
};

export const getCartDiscountPrice = (pID, current_customer, quantity) => {
  const cartPriceOffer = rules.filter(
    ({ CustomerID, DiscountType, ProductID, NumberOfItems }) => {
      return (
        CustomerID === current_customer &&
        ProductID === pID &&
        DiscountType === "CartDiscount" &&
        quantity >= NumberOfItems
      );
    }
  );
  return cartPriceOffer.length ? cartPriceOffer[0].Price : null;
};

export const getCartAdditionalQuantity = (pID, current_customer, quantity) => {
  const cartAdditionalItems = rules.filter(
    ({ CustomerID, DiscountType, ProductID, NumberOfItems }) => {
      return (
        CustomerID === current_customer &&
        ProductID === pID &&
        DiscountType === "CartAdditionalItems" &&
        quantity % NumberOfItems >= 0
      );
    }
  );
  return cartAdditionalItems.length
    ? Math.floor(quantity / cartAdditionalItems[0].NumberOfItems) *
        cartAdditionalItems[0].ExtraItems
    : null;
};

export const applyRulesOnCartItem = (cartItem, pID, current_customer) => {
  cartItem.DiscountPrice = getCartDiscountPrice(
    pID,
    current_customer,
    cartItem.Quantity
  );
  cartItem.BonusItems = getCartAdditionalQuantity(
    pID,
    current_customer,
    cartItem.Quantity
  );
  return cartItem;
};
