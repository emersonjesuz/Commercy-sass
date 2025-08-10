export class DomainError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = new.target.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}
