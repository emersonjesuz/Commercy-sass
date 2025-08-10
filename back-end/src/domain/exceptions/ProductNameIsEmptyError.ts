import { DomainError } from "./DomainError";

export class ProductNameIsEmptyError extends DomainError {
  constructor() {
    super("O nome do produto é não pode ser vazio!", 400);
  }
}
