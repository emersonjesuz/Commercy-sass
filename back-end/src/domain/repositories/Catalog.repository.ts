import type { CatalogEntity } from "../entity/Catalog.entity";

export interface CatalogRepository {
  save(name: string): Promise<CatalogEntity>;
  update(name: string, catalogId: string): Promise<CatalogEntity>;
  findById(catalogId: string): Promise<CatalogEntity | null>;
  findAll(): Promise<CatalogEntity[]>;
  delete(catalogId: string): Promise<void>;
}
