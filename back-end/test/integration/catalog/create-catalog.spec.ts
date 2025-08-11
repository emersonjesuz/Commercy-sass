import { CreateCatalogUseCase } from "../../../src/application/usecases/catalog/CreateCatalog.usecase";
import { CatalogEntity } from "../../../src/domain/entity/Catalog.entity";
import { ProductEntity } from "../../../src/domain/entity/Product.entity";
import type { CatalogRepository } from "../../../src/domain/repositories/Catalog.repository";

const products = [
  {
    name: "Luna",
    description: "Perfume floral marcante da Natura",
    quantity: 1,
    price: 149.9,
  },
  {
    name: "Egeo Dolce",
    description: "Perfume adocicado do Boticário",
    quantity: 2,
    price: 129.9,
  },
  {
    name: "Malbec",
    description: "Perfume amadeirado intenso do Boticário",
    quantity: 1,
    price: 189.9,
  },
  {
    name: "Essencial Exclusivo",
    description: "Perfume elegante e sofisticado da Natura",
    quantity: 1,
    price: 199.9,
  },
  {
    name: "Kaiak",
    description: "Perfume fresco e vibrante da Natura",
    quantity: 3,
    price: 99.9,
  },
];

describe("Criar catalogo", () => {
  let createCatalogUseCase: CreateCatalogUseCase;
  let catalogRepository: CatalogRepository;

  beforeEach(() => {
    catalogRepository = {
      save: jest.fn().mockReturnValue((name: string) => new CatalogEntity("cat-001", name, [])),
      update: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    };
    createCatalogUseCase = new CreateCatalogUseCase(catalogRepository);
  });

  test("Deve criar um catalogo sem produtos", async () => {
    const input = {
      name: "Perfumes",
      products: [],
    };

    const response = await createCatalogUseCase.execute(input);
    expect(response).toHaveProperty("catalogId");
    expect(response).toHaveProperty("products", []);
  });

  test("Deve criar um catalogo e criar seus produtos", async () => {
    const input = {
      name: "Perfumes",
      products,
    };

    const response = await createCatalogUseCase.execute(input);

    expect(response).toHaveProperty("catalogId");
    const responseProducts = response.products;
    expect(responseProducts).toHaveLength(5);
    // expect(responseProducts.map(product=> product.))
    // talves criar getproductid
  });
});
