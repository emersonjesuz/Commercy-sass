import { DomainError } from "./DomainError";

export class CatalogNameIsEmptyError extends DomainError {
  constructor() {
    super("O nome do catalogo não pode ser vazio!", 400);
  }
}
