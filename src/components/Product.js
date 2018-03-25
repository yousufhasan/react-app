import React from "react";

export default ({ product, addToCart, customer }) => {
  return (
    <div className="card">
      <div className={`card-header ${product.ID}`}>
        <p className="name"> {product.Name} </p>
      </div>
      <div className="card-pricing">
        <span className="old text-danger">{product.DiscountPrice? product.Price:"" }</span>
        <span>$</span>
        {Math.floor(product.DiscountPrice || product.Price)}
        <sup>
          {((product.DiscountPrice || product.Price) % 1)
            .toFixed(4)
            .substring(2, 4)}
        </sup>
        <p className="ad">per advertisement</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">dummy Feature 1</li>
        <li className="list-group-item">place holder for Feature 2</li>
        <li className="list-group-item">space for Feature 3</li>
      </ul>
      <div className="card-footer">
        <button
          type="button"
          className={`btn ${product.ID}`}
          onClick={() => addToCart(product.ID, customer)}
        >
          Add to card
        </button>
      </div>
    </div>
  );
};
