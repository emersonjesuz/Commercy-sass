import { DomainError } from "./DomainError";

export class ProductNotFindError extends DomainError {
  constructor() {
    super("Produto não encontrado", 404);
  }
}
