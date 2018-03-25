import React from "react";
import Customers from "../containers/Customers";
export default () => {
  return (
    <header>
      <nav className="navbar navbar-dark bg-lighter-dark">
        <div className="col-md-2 offset-md-10 col-sm-6 offset-sm-6">
          <Customers />
        </div>
      </nav>
    </header>
  );
};
