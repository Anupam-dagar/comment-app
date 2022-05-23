import { BaseError } from "./base.error";
import httpStatusCodes from "http-status-codes";

export class DbError extends BaseError {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
    console.log(`${DbError.name}: ${message}`);
  }
}
