import { ProductIdValidator } from "../../src/domain/validators/ProductId.validator";

describe("Validar id do produto", () => {
  test("Deve lança um erro se o productId for vazio", () => {
    const productId = "";
    expect(() => ProductIdValidator.validate(productId)).toThrow("O identificador do produto é obrigatório!");
  });

  test("Deve não lança um erro se o productId estiver preenchido", () => {
    const productId = "123";
    expect(() => ProductIdValidator.validate(productId)).not.toThrow();
  });
});
