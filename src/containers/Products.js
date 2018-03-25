import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductsForCurrentCustomer, addProductToCart } from "../actions";
import Product from "../components/Product";

class Products extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentCustomer !== this.props.currentCustomer) {
      this.props.getProductsForCurrentCustomer(this.props.currentCustomer);
    }
  }

  renderProducts() {
    return this.props.products.map(product => {
      return (
        <div key={product.ID} className="col-md-4 col-sm-12">
          <Product
            product={product}
            addToCart={this.props.addProductToCart}
            customer={this.props.currentCustomer}
          />
        </div>
      );
    });
  }
  render() {
    return (
      <section className="container section_products">
        <div className="row">{this.renderProducts()}</div>
      </section>
    );
  }
}
function mapStateToProps(state) {
  return {
    products: state.product.productList,
    currentCustomer: state.customer.currentCustomer
  };
}
export default connect(mapStateToProps, {
  getProductsForCurrentCustomer,
  addProductToCart
})(Products);
