import { UpdateCatalogUseCase } from "../../../src/application/usecases/catalog/UpdateCatalog.usecase";
import { CatalogEntity } from "../../../src/domain/entity/Catalog.entity";
import type { CatalogRepository } from "../../../src/domain/repositories/Catalog.repository";

describe("Atualizar catalogo", () => {
  let updateCatalogUseCase: UpdateCatalogUseCase;
  let catalogRepository: CatalogRepository;

  beforeEach(() => {
    catalogRepository = {
      save: jest.fn(),
      update: jest.fn().mockReturnValue(new CatalogEntity("1", "perucas", [])),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    };
    updateCatalogUseCase = new UpdateCatalogUseCase(catalogRepository);
  });

  test("Deve atualizar um catalogo", async () => {
    const name = "perucas";
    const catalogId = "cat-001";
    const response = await updateCatalogUseCase.execute(name, catalogId);
    expect(response.name).toEqual(name);
  });

  test("Deve lançar um erro se o nome do catalogo for vazio", async () => {
    const name = "";
    const catalogId = "cat-001";
    const response = updateCatalogUseCase.execute(name, catalogId);
    await expect(() => response).rejects.toThrow("O nome do catalogo não pode ser vazio!");
  });
});
