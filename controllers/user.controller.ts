import { Request, Response } from "express";
import asyncController from "../middlewares/asyncController.middleware";
import IController from "../models/controller";
import userService from "../services/user.service";
import { ApiResponse } from "../utils/apiresponse";

const getUser: IController = asyncController(
  async (req: Request, res: Response) => {
    const users = await userService.getUser();
    ApiResponse.success(res, users, 200);
  }
);

export default {
  getUser,
};
