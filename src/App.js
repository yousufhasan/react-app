import React from "react";
import Header from "./components/Header";
import Products from "./containers/Products";
import Cart from "./containers/Cart";

export default () => {
  return (
    <div>
      <Header />
      <Products />
      <Cart />
    </div>
  );
};
