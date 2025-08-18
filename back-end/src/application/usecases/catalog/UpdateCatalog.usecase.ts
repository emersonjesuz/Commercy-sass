import type { CatalogRepository } from "../../../domain/repositories/Catalog.repository";
import { CatalogNameValidator } from "../../../domain/validators/CatalogName.validator";

export class UpdateCatalogUseCase {
  constructor(private readonly catalogRepository: CatalogRepository) {}
  async execute(name: string, catalogId: string) {
    CatalogNameValidator.validate(name);
    const catalog = await this.catalogRepository.update(name, catalogId);
    return catalog.toJson();
  }
}
