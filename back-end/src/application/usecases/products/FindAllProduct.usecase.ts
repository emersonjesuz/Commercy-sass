import type { ProductRepository } from "../../../domain/repositories/Product.repository";

export class FindAllProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute() {
    const response = await this.productRepository.findAll();
    return response.map((product) => product.toJson());
  }
}
