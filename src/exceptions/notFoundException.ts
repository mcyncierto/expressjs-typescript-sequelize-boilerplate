export class NotFoundException extends Error {
  statusCode: number;

  constructor(public errors: string = "Record not found") {
    super("Not found error");
    this.statusCode = 404;
    this.errors = errors;
  }
}
