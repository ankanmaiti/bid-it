export class ApiError extends Error {
  statusCode: number;
  success: boolean;
  data: unknown;

  constructor(statusCode: number, message: string, cause?: unknown) {
    super();
    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this.cause = cause;
    this.data = null;
  }
}
