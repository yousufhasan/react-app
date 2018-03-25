import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllCustomers, changeCustomer } from "../actions";

class Customers extends Component {
  componentDidMount() {
    this.props.getAllCustomers();
  }
  renderCustomers() {
    return this.props.customers.map(({ ID, Name }) => {
      return (
        <option key={ID} value={ID}>
          {Name}
        </option>
      );
    });
  }

  render() {
    return (
      <select className="form-control" onChange={this.props.changeCustomer}>
        {this.renderCustomers()}
      </select>
    );
  }
}

function mapStateToProps(state) {
  return {
    customers: state.customer.customerList
  };
}

export default connect(mapStateToProps, { getAllCustomers, changeCustomer })(
  Customers
);
