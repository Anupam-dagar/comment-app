import { Request, Response } from "express";
import asyncController from "../middlewares/asyncController.middleware";
import IController from "../models/controller";
import { ApiResponse } from "../utils/apiresponse";

const getUser: IController = asyncController(
  async (req: Request, res: Response) => {
    ApiResponse.success(res, { hello: "hello" }, 200);
  }
);

export default {
  getUser,
};
