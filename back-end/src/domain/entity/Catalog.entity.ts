import { CatalogIdIsEmptyError } from "../exceptions/CatalogIdIsEmptyError";
import { CatalogNameIsEmptyError } from "../exceptions/CatalogNameIsEmptyError";
import type { ProductEntity } from "./Product.entity";

const input = {
  catalogId: "cat-001",
  name: "Perfumes",
  products: [],
  createdAt: new Date(),
};

export class CatalogEntity {
  private catalogId: string;
  private name: string;
  private products: ProductEntity[];
  private createdAt: Date;
  constructor(catalogId: string = "", name: string, products: ProductEntity[], createdAt: Date = new Date()) {
    this.validateName(name);

    this.catalogId = catalogId;
    this.name = name;
    this.products = products;
    this.createdAt = createdAt;
  }

  private validateName(name: string) {
    if (!name || !name.trim()) {
      throw new CatalogNameIsEmptyError();
    }
  }

  getCatalogId() {
    const catalogId = this.catalogId;
    if (!catalogId) {
      throw new CatalogIdIsEmptyError();
    }
    return this.catalogId;
  }

  getProducts() {
    return this.products.map((product) => product.toJson());
  }

  toJson() {
    return {
      catalogId: this.catalogId,
      name: this.name,
      products: this.products,
      createdAt: this.createdAt,
    };
  }
}
