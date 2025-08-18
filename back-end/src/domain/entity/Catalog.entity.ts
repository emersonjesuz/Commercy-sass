import { CatalogIdIsEmptyError } from "../exceptions/CatalogIdIsEmptyError";
import { CatalogNameIsEmptyError } from "../exceptions/CatalogNameIsEmptyError";
import { ProductEntity } from "./Product.entity";

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

  addProduct(
    productId: string = "",
    name: string,
    description: string,
    quantity: number,
    price: number,
    createdAt: Date = new Date()
  ) {
    this.products.push(new ProductEntity(productId, name, description, quantity, price, createdAt, this.getCatalogId()));
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
