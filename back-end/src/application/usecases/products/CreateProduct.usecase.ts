import { ProductEntity } from "../../../domain/entity/Product.entity";
import type { ProductRepository } from "../../../domain/repositories/Product.repository";

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(input: Input) {
    const product = new ProductEntity(undefined, input.name, input.description, input.quantity, input.price);
    const response = await this.productRepository.save(product);
    return response.toJson();
  }
}

interface Input {
  name: string;
  description: string;
  quantity: number;
  price: number;
}
