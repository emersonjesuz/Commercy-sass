import { DomainError } from "./DomainError";

export class ProductQuantityInvalidError extends DomainError {
  constructor() {
    super("A quantidade não pode ser inferior a um!", 400);
  }
}
