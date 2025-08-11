import { ProductEntity } from "../../../domain/entity/Product.entity";
import type { ProductRepository } from "../../../domain/repositories/Product.repository";
import type { CreateProductDto } from "../../dtos/CreateProduct.dto";

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute(input: CreateProductDto) {
    const product = new ProductEntity(
      undefined,
      input.name,
      input.description,
      input.quantity,
      input.price,
      undefined,
      input.catalogId
    );
    const response = await this.productRepository.save(product);
    return response.toJson();
  }
}
