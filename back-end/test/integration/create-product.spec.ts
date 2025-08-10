import { CreateProductUseCase } from "../../src/application/usecases/products/CreateProduct.usecase";
import { ProductEntity } from "../../src/domain/entity/Product.entity";
import type { ProductRepository } from "../../src/domain/repositories/Product.repository";

describe("Criar produtos", () => {
  let createProductUseCase: CreateProductUseCase;
  let repository: jest.Mocked<ProductRepository>;
  beforeEach(() => {
    repository = {
      save: jest.fn().mockReturnValue(new ProductEntity("id-qualquer", "batom", "Batom vermelho da Avon", 1, 10.5)),
      update: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    };
    createProductUseCase = new CreateProductUseCase(repository);
  });

  test("Deve ser possivel criar um produto", async () => {
    const input = {
      name: "batom",
      description: "Batom vermelho da Avon",
      quantity: 1,
      price: 10.5,
    };
    const response = await createProductUseCase.execute(input);
    expect(response).toHaveProperty("productId");
    expect(response).toHaveProperty("name");
    expect(response).toHaveProperty("description");
    expect(response).toHaveProperty("quantity");
    expect(response).toHaveProperty("price");
    expect(response).toHaveProperty("createdAt");
  });

  test("Deve não ser possivel criar um produto se o nome não for informado", async () => {
    const input = {
      name: "",
      description: "Batom vermelho da Avon",
      quantity: 1,
      price: 10.5,
    };
    await expect(() => createProductUseCase.execute(input)).rejects.toThrow("O nome do produto é não pode ser vazio!");
  });

  test("Deve não ser possivel criar um produto se a quantidade for menor igual a zero", async () => {
    const input = {
      name: "batom",
      description: "Batom vermelho da Avon",
      quantity: 0,
      price: 10.5,
    };
    await expect(() => createProductUseCase.execute(input)).rejects.toThrow("A quantidade não pode ser inferior a um!");
  });

  test("Deve não ser possivel criar um produto se o preço for menor igual a zero", async () => {
    const input = {
      name: "batom",
      description: "Batom vermelho da Avon",
      quantity: 1,
      price: 0,
    };
    await expect(() => createProductUseCase.execute(input)).rejects.toThrow("O preço não pode ser menor ou igual a zero!");
  });
});
