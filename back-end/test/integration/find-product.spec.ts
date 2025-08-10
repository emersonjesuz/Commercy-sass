import { FindProductUseCase } from "../../src/application/usecases/products/FindProduct.usecase";
import { ProductEntity } from "../../src/domain/entity/Product.entity";
import type { ProductRepository } from "../../src/domain/repositories/Product.repository";

describe("Busca produto por id", () => {
  let findProductUseCase: FindProductUseCase;
  let repository: jest.Mocked<ProductRepository>;
  beforeEach(() => {
    repository = {
      save: jest.fn(),
      update: jest.fn(),
      findById: jest.fn().mockResolvedValue(null),
      findAll: jest.fn(),
      delete: jest.fn(),
    };
    findProductUseCase = new FindProductUseCase(repository);
  });

  test("Deve retorna um produto", async () => {
    (repository.findById as jest.Mock).mockResolvedValue(new ProductEntity("1ab2c3", "batom", "Batom vermelho da Avon", 1, 10.5));
    const productId = "1ab2c3";
    const response = await findProductUseCase.execute(productId);
    const output = {
      name: "batom",
      description: "Batom vermelho da Avon",
      quantity: 1,
      price: 10.5,
    };
    expect(response).toHaveProperty("productId");
    expect(response).toHaveProperty("name", output.name);
    expect(response).toHaveProperty("description", output.description);
    expect(response).toHaveProperty("quantity", output.quantity);
    expect(response).toHaveProperty("price", output.price);
    expect(response).toHaveProperty("createdAt");
  });

  test("Deve lança um error se productId não for informado", async () => {
    const productId = "";
    await expect(() => findProductUseCase.execute(productId)).rejects.toThrow("O identificador do produto é obrigatório!");
  });

  test("Deve lança um error se produto não existir", async () => {
    const productId = "123";
    await expect(() => findProductUseCase.execute(productId)).rejects.toThrow("Produto não encontrado");
  });
});
