import { FindAllProductUseCase } from "../../src/application/usecases/products/FindAllProduct.usecase";
import { ProductEntity } from "../../src/domain/entity/Product.entity";
import type { ProductRepository } from "../../src/domain/repositories/Product.repository";

describe("Buscar todos os produtos", () => {
  let findAllProductUseCase: FindAllProductUseCase;
  let repository: jest.Mocked<ProductRepository>;
  const dataDatabaseMock = [
    new ProductEntity("id-001", "Batom", "Batom vermelho da Avon", 1, 10.5),
    new ProductEntity("id-002", "Perfume", "Perfume floral 50ml", 2, 120.0),
    new ProductEntity("id-003", "Shampoo", "Shampoo hidratante 300ml", 3, 25.9),
    new ProductEntity("id-004", "Condicionador", "Condicionador nutritivo 300ml", 4, 27.5),
    new ProductEntity("id-005", "Creme para mãos", "Creme para hidratação profunda", 5, 15.0),
    new ProductEntity("id-006", "Base líquida", "Base líquida efeito matte", 2, 45.9),
    new ProductEntity("id-007", "Lápis de olho", "Lápis preto à prova d'água", 6, 8.75),
    new ProductEntity("id-008", "Máscara de cílios", "Máscara para volume intenso", 3, 32.4),
    new ProductEntity("id-009", "Sabonete líquido", "Sabonete líquido de lavanda", 7, 12.9),
    new ProductEntity("id-010", "Óleo corporal", "Óleo corporal perfumado", 1, 55.0),
  ];
  beforeEach(() => {
    repository = {
      save: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn().mockResolvedValue(dataDatabaseMock),
      delete: jest.fn(),
    };

    findAllProductUseCase = new FindAllProductUseCase(repository);
  });

  test("Deve ser possivel buscar um lista de produtos", async () => {
    const response = await findAllProductUseCase.execute();
    expect(response).toHaveLength(10);
    expect(response[0]).toHaveProperty("productId", "id-001");
    expect(response[9]).toHaveProperty("productId", "id-010");
  });

  test("Deve ser possivel filtrar a lista por nome de produtos", async () => {
    (repository.findAll as jest.Mock).mockResolvedValue([dataDatabaseMock[3]]);
    const response = await findAllProductUseCase.execute();
    expect(response).toHaveLength(1);
    expect(response[0]).toHaveProperty("name", "Condicionador");
  });

  test("Deve retornar um lista vazia se não existir nome de produtos", async () => {
    (repository.findAll as jest.Mock).mockResolvedValue([]);
    const response = await findAllProductUseCase.execute();
    expect(response).toHaveLength(0);
  });

  test("Deve ser possivel ordenar a lista por nome ordem alfabética A-Z (crescente)", async () => {
    (repository.findAll as jest.Mock).mockResolvedValue(
      [...dataDatabaseMock].sort((a, b) => a.getName().localeCompare(b.getName()))
    );
    const response = await findAllProductUseCase.execute();
    expect(response).toHaveLength(10);
    expect(response[0]).toHaveProperty("name", "Base líquida");
    expect(response[9]).toHaveProperty("name", "Shampoo");
  });

  test("Deve ser possivel ordenar a lista por nome ordem alfabética Z-A (decrescente)", async () => {
    (repository.findAll as jest.Mock).mockResolvedValue(
      [...dataDatabaseMock].sort((a, b) => b.getName().localeCompare(a.getName()))
    );
    const response = await findAllProductUseCase.execute();
    expect(response).toHaveLength(10);
    expect(response[0]).toHaveProperty("name", "Shampoo");
    expect(response[9]).toHaveProperty("name", "Base líquida");
  });
});
