import { CatalogEntity } from "../../../domain/entity/Catalog.entity";
import { ProductEntity } from "../../../domain/entity/Product.entity";
import type { CatalogRepository } from "../../../domain/repositories/Catalog.repository";
import type { CreateCatalogDto } from "../../dtos/CreateCatalog.dto";

export class CreateCatalogUseCase {
  constructor(private readonly catalogRepository: CatalogRepository) {}
  async execute(input: CreateCatalogDto) {
    const catalogDataDatabase = await this.catalogRepository.save(input.name);
    const products = input.products.map(
      (product) =>
        new ProductEntity(
          undefined,
          product.name,
          product.description,
          product.quantity,
          product.price,
          undefined,
          catalogDataDatabase.getCatalogId()
        )
    );
    const catalog = new CatalogEntity(undefined, input.name, products);
    return catalog.toJson();
  }
}
