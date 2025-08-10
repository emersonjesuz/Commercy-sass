import type { ProductEntity } from "../entity/Product.entity";

export interface ProductRepository {
  save(product: ProductEntity): Promise<ProductEntity>;
  update(product: ProductEntity, productId: string): Promise<ProductEntity>;
  findById(productId: string): Promise<ProductEntity | null>;
  findAll(): Promise<ProductEntity[]>;
  delete(productId: string): Promise<void>;
}
