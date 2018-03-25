export default class CartItem {
  constructor(
    ProductID,
    ProductName,
    Price,
    DiscountPrice,
    Quantity,
    BonusItems
  ) {
    this.ProductID = ProductID;
    this.ProductName = ProductName;
    this.Price = Price;
    this.DiscountPrice = DiscountPrice;
    this.Quantity = Quantity;
    this.BonusItems = BonusItems;
  }
}
