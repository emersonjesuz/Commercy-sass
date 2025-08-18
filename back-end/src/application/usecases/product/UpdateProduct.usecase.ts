import { ProductEntity } from "../../../domain/entity/Product.entity";
import { ProductNotFindError } from "../../../domain/exceptions/ProductNotFindError";
import type { ProductRepository } from "../../../domain/repositories/Product.repository";
import { ProductIdValidator } from "../../../domain/validators/ProductId.validator";

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(input: Input, productId: string) {
    ProductIdValidator.validate(productId);
    const productDataDatabase = await this.productRepository.findById(productId);
    if (!productDataDatabase) {
      throw new ProductNotFindError();
    }
    const product = new ProductEntity(
      undefined,
      input.name,
      input.description,
      input.quantity,
      input.price,
      undefined,
      input.catalogId
    );
    const response = await this.productRepository.update(product, productId);
    return response.toJson();
  }
}

interface Input {
  name: string;
  description: string;
  quantity: number;
  price: number;
  catalogId: string;
}
