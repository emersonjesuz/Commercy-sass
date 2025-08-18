import { CatalogNameIsEmptyError } from "../exceptions/CatalogNameIsEmptyError";

export class CatalogNameValidator {
  static validate(name: string) {
    if (!name || !name.trim()) {
      throw new CatalogNameIsEmptyError();
    }
  }
}
