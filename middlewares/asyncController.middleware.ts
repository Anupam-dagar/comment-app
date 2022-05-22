import { Request, Response } from "express";
import { ApiResponse } from "../utils/apiresponse";

const asyncController =
  (fn: (arg0: any, arg1: any) => any) =>
  async (req: Request, res: Response) => {
    await fn(req, res).catch((error: any) => {
      console.log(`Error executing request: ${error}`);
      ApiResponse.error(
        res,
        error.statusCode,
        error.message,
        error.name,
        error.data
      );
    });
  };

export default asyncController;
