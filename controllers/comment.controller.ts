import { Request, Response } from "express";
import asyncController from "../middlewares/asyncController.middleware";
import { CreateComment } from "../models/comment.model";
import IController from "../models/controller";
import commentService from "../services/comment.service";
import { ApiResponse } from "../utils/apiresponse";

const createComment: IController = asyncController(
  async (req: Request, res: Response) => {
    const body: CreateComment = req.body;
    const createdBy: string = req.headers.createdby as string;
    const comment = await commentService.createComment(body, createdBy);
    ApiResponse.success(res, { comment }, 200);
  }
);

export default {
  createComment,
};
