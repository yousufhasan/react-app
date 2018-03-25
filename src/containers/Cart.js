import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCartForCurrentCustomer,
  removeItemFromCart,
  addProductToCart
} from "../actions";
class Cart extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentCustomer !== this.props.currentCustomer) {
      this.props.getCartForCurrentCustomer(this.props.currentCustomer);
    }
  }
  renderTotal() {
    if (this.props.total) {
      return (
        <tr>
          <td colSpan="2" />
          <td>
            <p className="total">Total : ${this.props.total.toFixed(2)}</p>
          </td>
        </tr>
      );
    }
  }
  showItemQuantity(cartItem) {
    if (cartItem.BonusItems) {
      return (
        <p className="quantity">
          <span className="old text-danger font-weight-bold">
            {cartItem.Quantity}
          </span>
          <span className="text-success font-weight-bold">
            {cartItem.Quantity + cartItem.BonusItems}
          </span>
        </p>
      );
    } else {
      return <p className="quantity">{cartItem.Quantity} </p>;
    }
  }
  showItemPrice(cartItem) {
    if (cartItem.DiscountPrice) {
      return (
        <p>
          <span className="old text-danger font-weight-bold">
            {cartItem.Price}
          </span>
          <span className="text-success font-weight-bold">
            {cartItem.DiscountPrice}
          </span>
        </p>
      );
    } else {
      return <p>{cartItem.Price} </p>;
    }
  }
  renderCartItems() {
    return this.props.cart.map(cartItem => {
      return (
        <tr key={cartItem.ProductID}>
          <td>{cartItem.ProductName}</td>
          <td>{this.showItemPrice(cartItem)}</td>
          <td>
            <i
              onClick={() =>
                this.props.addProductToCart(
                  cartItem.ProductID,
                  this.props.currentCustomer
                )
              }
              className="fa fa-plus text-success"
            />
            {this.showItemQuantity(cartItem)}
            <i
              onClick={() =>
                this.props.removeItemFromCart(
                  cartItem.ProductID,
                  this.props.currentCustomer
                )
              }
              className="fa fa-minus text-danger"
            />
          </td>
        </tr>
      );
    });
  }

  render() {
    if (!this.props.cart || !this.props.cart.length) return <div />;
    return (
      <section className="container section_cart">
        <table className="table">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity </th>
            </tr>
            {this.renderCartItems()}
            {this.renderTotal()}
          </tbody>
        </table>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cartItems,
    total: state.cart.cartTotal,
    currentCustomer: state.customer.currentCustomer
  };
}
export default connect(mapStateToProps, {
  getCartForCurrentCustomer,
  removeItemFromCart,
  addProductToCart
})(Cart);
