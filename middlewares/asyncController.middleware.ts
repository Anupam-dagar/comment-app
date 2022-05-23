import { Request, Response } from "express";
import { BaseError } from "../models/errors/base.error";
import { ApiResponse } from "../utils/apiresponse";
import httpStatusCodes from "http-status-codes";

const asyncController =
  (fn: (arg0: any, arg1: any) => any) =>
  async (req: Request, res: Response) => {
    await fn(req, res).catch((error: any) => {
      console.log(`Error executing request: ${error}`);
      if (error instanceof BaseError) {
        ApiResponse.error(res, error.statusCode, error.message, error.name);
      } else {
        ApiResponse.error(
          res,
          httpStatusCodes.INTERNAL_SERVER_ERROR,
          error.message,
          error.name
        );
      }
    });
  };

export default asyncController;
