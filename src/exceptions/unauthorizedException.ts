export class UnauthorizedException extends Error {
  statusCode: number;

  constructor(public errors: string = "Unauthorized") {
    super("Unauthorized error");
    this.statusCode = 401;
    this.message = errors;
  }
}
