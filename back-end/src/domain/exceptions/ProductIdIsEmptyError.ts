import { DomainError } from "./DomainError";

export class ProductIdIsEmptyError extends DomainError {
  constructor() {
    super("O identificador do produto é obrigatório!", 400);
  }
}
