import React from "react";
import { shallow } from "enzyme";
import Product from "../components/Product";
import Prod from "../model/Product";

describe("Product", () => {
  const p = new Prod("classic", "Classic Ad", 269.99, null);
  const p2 = new Prod("standout", "Standout Ad", 322.99, 309.99);
  const customer = "default";
  const mockFn = jest.fn();
  let c1 = shallow(
    <Product product={p} addToCart={mockFn} customer={customer} />
  );
  let c2 = shallow(
    <Product product={p2} addToCart={mockFn} customer={customer} />
  );

  it("Showing the correct product name", () => {
    expect(c1.text()).toContain(p.Name);
    expect(c2.text()).toContain(p2.Name);
  });

  it("Showing the correct Original Price and Discount Price(If Provided)", () => {
    expect(c1.text()).toContain(Math.floor(p.Price));
    expect(c2.text()).toContain(Math.floor(p2.DiscountPrice));
  });

  it("contains the Add to Cart Button", () => {
    expect(c1.find("button")).toHaveLength(1);
  });
});
