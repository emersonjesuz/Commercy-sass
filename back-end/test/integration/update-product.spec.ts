import { UpdateProductUseCase } from "../../src/application/usecases/products/UpdateProduct.usecase";
import { ProductEntity } from "../../src/domain/entity/Product.entity";
import type { ProductRepository } from "../../src/domain/repositories/Product.repository";

describe("Atualizar produto", () => {
  let updateProductUseCase: UpdateProductUseCase;
  let repository: jest.Mocked<ProductRepository>;
  beforeEach(() => {
    repository = {
      save: jest.fn(),
      update: jest.fn().mockResolvedValue(new ProductEntity("id-qualquer", "batom", "Batom vermelho da Avon", 1, 10.5)),
      findById: jest.fn().mockResolvedValue(new ProductEntity("id-qualquer", "batom", "", 1, 10)),
      findAll: jest.fn(),
      delete: jest.fn(),
    };
    updateProductUseCase = new UpdateProductUseCase(repository);
  });

  test("Deve atualizar um produto", async () => {
    const input = {
      name: "batom",
      description: "Batom vermelho da Avon",
      quantity: 1,
      price: 10.5,
    };
    const productId = "233443443";
    const response = await updateProductUseCase.execute(input, productId);
    expect(response).toHaveProperty("productId");
    expect(response).toHaveProperty("name", input.name);
    expect(response).toHaveProperty("description", input.description);
    expect(response).toHaveProperty("quantity", input.quantity);
    expect(response).toHaveProperty("price", input.price);
    expect(response).toHaveProperty("createdAt");
  });

  test("Deve não atualizar se productId não for informado", async () => {
    const input = {
      name: "batom",
      description: "Batom vermelho da Avon",
      quantity: 1,
      price: 10.5,
    };
    const productId = "";
    await expect(updateProductUseCase.execute(input, productId)).rejects.toThrow("O identificador do produto é obrigatório!");
  });

  test("Deve não atualizar o produto que não existe", async () => {
    (repository.findById as jest.Mock).mockResolvedValueOnce(null);
    const input = {
      name: "batom",
      description: "Batom vermelho da Avon",
      quantity: 1,
      price: 10.5,
    };
    const productId = "233443443";
    await expect(updateProductUseCase.execute(input, productId)).rejects.toThrow("Produto não encontrado");
  });

  test("Deve não atualizar o produto com nome vazio!", async () => {
    const input = {
      name: "",
      description: "Batom vermelho da Avon",
      quantity: 1,
      price: 10.5,
    };
    const productId = "233443443";
    await expect(updateProductUseCase.execute(input, productId)).rejects.toThrow("O nome do produto é não pode ser vazio!");
  });

  test("Deve não atualizar o produto com quantidade menor ou igual a zero!", async () => {
    const input = {
      name: "batom",
      description: "Batom vermelho da Avon",
      quantity: 0,
      price: 10.5,
    };
    const productId = "233443443";
    await expect(updateProductUseCase.execute(input, productId)).rejects.toThrow("A quantidade não pode ser inferior a um!");
  });

  test("Deve não atualizar o produto com preço menor ou igual a zero!", async () => {
    const input = {
      name: "batom",
      description: "Batom vermelho da Avon",
      quantity: 2,
      price: 0,
    };
    const productId = "233443443";
    await expect(updateProductUseCase.execute(input, productId)).rejects.toThrow("O preço não pode ser menor ou igual a zero!");
  });
});
