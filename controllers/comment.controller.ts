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
    await commentService.createComment(body, createdBy);
    ApiResponse.success(res, {}, 200);
  }
);

const getComments: IController = asyncController(
  async (req: Request, res: Response) => {
    const comments = await commentService.getComments();
    ApiResponse.success(res, { comments }, 200);
  }
);

export default {
  createComment,
  getComments,
};