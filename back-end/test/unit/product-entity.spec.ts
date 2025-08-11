import { ProductEntity } from "../../src/domain/entity/Product.entity";

describe("Produtos", () => {
  test("Deve criar um produto", () => {
    const input = {
      productId: "1a12a2a2a1a",
      name: "batom",
      description: "Batom vermelho da avon",
      quantity: 1,
      price: 10.5,
      createdAt: new Date(),
      catalogId: "cat-0012",
    };
    const output = { ...input };
    const product = new ProductEntity(
      input.productId,
      input.name,
      input.description,
      input.quantity,
      input.price,
      input.createdAt,
      input.catalogId
    );
    expect(product.toJson()).toEqual(output);
  });

  test("Deve retorna o nome do produto pelo metodo getName", () => {
    const input = {
      productId: "1a12a2a2a1a",
      name: "batom",
      description: "Batom vermelho da avon",
      quantity: 1,
      price: 10.5,
      createdAt: new Date(),
      catalogId: "cat-0012",
    };
    const output = input;
    const product = new ProductEntity(
      input.productId,
      input.name,
      input.description,
      input.quantity,
      input.price,
      input.createdAt,
      input.catalogId
    );
    expect(product.getName()).toEqual(output.name);
  });

  test("Deve lançar um erro se o nome for vazio", () => {
    const input = {
      productId: "1a12a2a2a1a",
      name: "",
      description: "Batom vermelho da avon",
      quantity: 1,
      price: 10.5,
      createdAt: new Date(),
      catalogId: "cat-0012",
    };
    expect(
      () =>
        new ProductEntity(
          input.productId,
          input.name,
          input.description,
          input.quantity,
          input.price,
          input.createdAt,
          input.catalogId
        )
    ).toThrow("O nome do produto não pode ser vazio!");
  });

  test("Deve lançar um erro se a quantidade for menor ou igual a zero", () => {
    const input = {
      productId: "1a12a2a2a1a",
      name: "Batom",
      description: "Batom vermelho da avon",
      quantity: 0,
      price: 10.5,
      createdAt: new Date(),
      catalogId: "cat-0012",
    };
    expect(
      () =>
        new ProductEntity(
          input.productId,
          input.name,
          input.description,
          input.quantity,
          input.price,
          input.createdAt,
          input.catalogId
        )
    ).toThrow("A quantidade não pode ser inferior a um!");
    input.quantity = -1;
    expect(
      () =>
        new ProductEntity(
          input.productId,
          input.name,
          input.description,
          input.quantity,
          input.price,
          input.createdAt,
          input.catalogId
        )
    ).toThrow("A quantidade não pode ser inferior a um!");
  });

  test("Deve lançar um erro se a preço for menor ou igual a zero", () => {
    const input = {
      productId: "1a12a2a2a1a",
      name: "Batom",
      description: "Batom vermelho da avon",
      quantity: 2,
      price: 0,
      createdAt: new Date(),
      catalogId: "cat-0012",
    };
    expect(
      () =>
        new ProductEntity(
          input.productId,
          input.name,
          input.description,
          input.quantity,
          input.price,
          input.createdAt,
          input.catalogId
        )
    ).toThrow("O preço não pode ser menor ou igual a zero!");
  });

  test("Deve lançar um erro se a catalogId não for informado", () => {
    const input = {
      productId: "1a12a2a2a1a",
      name: "Batom",
      description: "Batom vermelho da avon",
      quantity: 2,
      price: 10,
      createdAt: new Date(),
      catalogId: "",
    };
    expect(
      () =>
        new ProductEntity(
          input.productId,
          input.name,
          input.description,
          input.quantity,
          input.price,
          input.createdAt,
          input.catalogId
        )
    ).toThrow("O identificador do catalogo é obrigatório!");
  });
});
