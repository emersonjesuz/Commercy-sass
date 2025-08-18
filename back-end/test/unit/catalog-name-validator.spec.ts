import { CatalogNameValidator } from "../../src/domain/validators/CatalogName.validator";

describe("Validar nome do Catalogo", () => {
  test("Deve não lançar um erro se o nome for valido", () => {
    const name = "Perfumes";
    expect(() => CatalogNameValidator.validate(name)).not.toThrow();
  });

  test("Deve lançar um erro se o nome for vazio", () => {
    const name = "";
    expect(() => CatalogNameValidator.validate(name)).toThrow("O nome do catalogo não pode ser vazio!");
  });
});
