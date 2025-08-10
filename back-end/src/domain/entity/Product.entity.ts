import { ProductNameIsEmptyError } from "../exceptions/ProductNameIsEmptyError";
import { ProductPriceInvalidError } from "../exceptions/ProductPriceInvalidError";
import { ProductQuantityInvalidError } from "../exceptions/ProductQuantityInvalidError";

export class ProductEntity {
  private productId: string;
  private name: string;
  private description: string;
  private quantity: number;
  private price: number;
  private createdAt: Date;

  constructor(
    productId: string = "",
    name: string,
    description: string,
    quantity: number,
    price: number,
    createdAt: Date = new Date()
  ) {
    this.validateName(name);
    this.validateQuantity(quantity);
    this.validatePrice(price);

    this.productId = productId;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
    this.createdAt = createdAt;
  }

  private validateName(name: string) {
    if (!name.trim()) {
      throw new ProductNameIsEmptyError();
    }
  }

  private validateQuantity(quantity: number) {
    if (quantity <= 0) {
      throw new ProductQuantityInvalidError();
    }
  }
  private validatePrice(price: number) {
    if (price <= 0) {
      throw new ProductPriceInvalidError();
    }
  }

  getName() {
    return this.name;
  }
  toJson() {
    return {
      productId: this.productId,
      name: this.name,
      description: this.description,
      quantity: this.quantity,
      price: this.price,
      createdAt: this.createdAt,
    };
  }
}
