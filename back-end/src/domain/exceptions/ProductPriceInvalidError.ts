import { DomainError } from "./DomainError";

export class ProductPriceInvalidError extends DomainError {
  constructor() {
    super("O preço não pode ser menor ou igual a zero!", 400);
  }
}
