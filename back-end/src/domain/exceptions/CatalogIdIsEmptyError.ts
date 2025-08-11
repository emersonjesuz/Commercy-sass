import { DomainError } from "./DomainError";

export class CatalogIdIsEmptyError extends DomainError {
  constructor() {
    super("O identificador do catalogo é obrigatório!", 400);
  }
}
