import { CatalogEntity } from "../../src/domain/entity/Catalog.entity";
import { ProductEntity } from "../../src/domain/entity/Product.entity";

describe("Catalogo entidade", () => {
  test("Deve criar um catálogo e retornar dados corretos em toJson()", () => {
    const input = {
      catalogId: "cat-001",
      name: "Perfumes",
      products: [],
      createdAt: new Date(),
    };
    const output = {
      catalogId: input.catalogId,
      name: input.name,
      products: input.products,
      createdAt: input.createdAt,
    };
    const catalog = new CatalogEntity(input.catalogId, input.name, input.products, input.createdAt);
    expect(catalog.toJson()).toEqual(output);
  });

  test("Deve não criar um catalogo sem nome", () => {
    const input = {
      catalogId: "cat-001",
      name: "",
      products: [],
      createdAt: new Date(),
    };

    expect(() => new CatalogEntity(input.catalogId, input.name, input.products, input.createdAt)).toThrow(
      "O nome do catalogo não pode ser vazio!"
    );
  });

  test("Deve retorna o identificador do catalogo ao chamar o metodo getCatalogId", () => {
    const input = {
      catalogId: "cat-001",
      name: "Bijuterias",
      products: [],
      createdAt: new Date(),
    };
    const catalog = new CatalogEntity(input.catalogId, input.name, input.products, input.createdAt);
    expect(catalog.getCatalogId()).toEqual(input.catalogId);
  });

  test("Deve lança um erro se getCatalogId não tiver um catalogId", () => {
    const input = {
      catalogId: "",
      name: "Bijuterias",
      products: [],
      createdAt: new Date(),
    };
    const catalog = new CatalogEntity(input.catalogId, input.name, input.products, input.createdAt);
    expect(() => catalog.getCatalogId()).toThrow("O identificador do catalogo é obrigatório");
  });

  test("Deve retorna uma lista de produtos ao chamar o metodo getProducts", () => {
    const catalogId = "cat-001";
    const input = {
      catalogId,
      name: "Cosméticos",
      products: [
        new ProductEntity("id-001", "Batom", "Batom vermelho da Avon", 1, 10.5, undefined, catalogId),
        new ProductEntity("id-002", "Perfume", "Perfume floral 50ml", 2, 120.0, undefined, catalogId),
        new ProductEntity("id-003", "Shampoo", "Shampoo hidratante 300ml", 3, 25.9, undefined, catalogId),
        new ProductEntity("id-004", "Condicionador", "Condicionador nutritivo 300ml", 4, 27.5, undefined, catalogId),
        new ProductEntity("id-005", "Creme para mãos", "Creme para hidratação profunda", 5, 15.0, undefined, catalogId),
      ],
      createdAt: new Date(),
    };
    const response = new CatalogEntity(input.catalogId, input.name, input.products, input.createdAt);
    const products = response.getProducts();
    expect(products).toHaveLength(5);
    expect(products.map((product) => product.productId)).toEqual(["id-001", "id-002", "id-003", "id-004", "id-005"]);
  });
});
