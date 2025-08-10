import { DeleteProductUseCase } from "../../src/application/usecases/products/DeleteProduct.usecase";
import { ProductEntity } from "../../src/domain/entity/Product.entity";
import type { ProductRepository } from "../../src/domain/repositories/Product.repository";

describe("Excluir pedido", () => {
  let deleteProductUseCase: DeleteProductUseCase;
  let repository: jest.Mocked<ProductRepository>;
  beforeEach(() => {
    repository = {
      save: jest.fn(),
      update: jest.fn(),
      findById: jest.fn().mockResolvedValue(new ProductEntity("id-003", "Shampoo", "Shampoo hidratante 300ml", 3, 25.9)),
      findAll: jest.fn(),
      delete: jest.fn(),
    };
    deleteProductUseCase = new DeleteProductUseCase(repository);
  });
  test("Deve excluir um pedido", async () => {
    const productId = "id-003";
    const response = deleteProductUseCase.execute(productId);
    await expect(response).resolves.not.toThrow();
  });

  test("Deve não ser possivel excluir um pedido se productId não for informado", async () => {
    const productId = "";
    const response = deleteProductUseCase.execute(productId);
    await expect(response).rejects.toThrow("O identificador do produto é obrigatório!");
  });

  test("Deve não ser possivel excluir um pedido que não existe", async () => {
    repository.findById.mockReturnValue(Promise.resolve(null));
    const productId = "id-003";
    const response = deleteProductUseCase.execute(productId);
    await expect(response).rejects.toThrow("Produto não encontrado");
  });
});
