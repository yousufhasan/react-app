import {
  getProductsForCurrentCustomer,
  getAllCustomers,
  addProductToCart,
  getCartForCurrentCustomer,
  removeItemFromCart
} from "../actions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import allTests from "./testData.json";
import "./mock-local-storage";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Action Business Logic", () => {
  describe("All User Cart Scenarios", () => {
    let store = mockStore();
    it("Calculating Correct Total After Discount and Bonust Items+Quantity", () => {
      for (const scenario of allTests) {
        for (const test of scenario["cart"]) {
          store.dispatch(addProductToCart(test.PID, scenario["customer"]));
        }
        store.dispatch(getCartForCurrentCustomer(scenario["customer"]));
        let totalQuantity = 0;
        for (const item of store.getActions()[store.getActions().length - 2]
          .payload) {
          totalQuantity += item.Quantity + (item.BonusItems || 0);
        }
        expect(
          store.getActions()[store.getActions().length - 1].payload
        ).toEqual(scenario["expectedTotal"]);
        expect(totalQuantity).toEqual(scenario["expectedQuantity"]);
        for (const test of scenario["cart"]) {
          store.dispatch(removeItemFromCart(test.PID, scenario["customer"]));
        }
        store.dispatch(getCartForCurrentCustomer(scenario["customer"]));
        expect(
          store.getActions()[store.getActions().length - 1].payload
        ).toEqual(0);
      }
    });
  });

  describe("GetProductForCurrentCustomer", () => {
    it("Returning correct Price and Discount Price for provided customer", () => {
      let action = getProductsForCurrentCustomer("default");
      expect(action.payload[0].Price).toEqual(269.99);
      expect(action.payload[0].DiscountPrice).toEqual(null);

      action = getProductsForCurrentCustomer("apple");
      expect(action.payload[1].Price).toEqual(322.99);
      expect(action.payload[1].DiscountPrice).toEqual(299.99);

      action = getProductsForCurrentCustomer("ford");
      expect(action.payload[1].Price).toEqual(322.99);
      expect(action.payload[1].DiscountPrice).toEqual(309.99);
    });
  });

  describe("getAllCustomers", () => {
    const store = mockStore();
    it("Returning All customers", () => {
      store.dispatch(getAllCustomers());
      expect(store.getActions()[0].payload.length).toEqual(5);
    });
  });
});
