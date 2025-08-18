import { ProductNotFindError } from "../../../domain/exceptions/ProductNotFindError";
import type { ProductRepository } from "../../../domain/repositories/Product.repository";
import { ProductIdValidator } from "../../../domain/validators/ProductId.validator";

export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(productId: string): Promise<void> {
    ProductIdValidator.validate(productId);
    const response = await this.productRepository.findById(productId);
    if (!response) {
      throw new ProductNotFindError();
    }
    await this.productRepository.delete(productId);
  }
}
