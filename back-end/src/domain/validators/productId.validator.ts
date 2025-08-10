import { ProductIdIsEmptyError } from "../exceptions/ProductIdIsEmptyError";

export class ProductIdValidator {
  static validate(productId: string) {
    if (!productId || !productId.trim()) {
      throw new ProductIdIsEmptyError();
    }
  }
}
