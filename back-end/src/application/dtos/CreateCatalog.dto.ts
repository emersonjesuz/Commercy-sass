import type { CreateProductDto } from "./CreateProduct.dto";

export interface CreateCatalogDto {
  name: string;
  products: Product[];
}

type Product = Omit<CreateProductDto, "catalogId">;
