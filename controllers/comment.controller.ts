import { Request, Response } from "express";
import asyncController from "../middlewares/asyncController.middleware";
import { CreateComment } from "../models/comment.model";
import IController from "../models/controller";
import commentService from "../services/comment.service";
import { ApiResponse } from "../utils/apiresponse";

const createComment: IController = asyncController(
  async (req: Request, res: Response) => {
    const body: CreateComment = req.body;
    const createdBy: number = Number(req.headers.user);
    const comment = await commentService.createComment(body, createdBy);
    ApiResponse.success(res, comment, 200);
  }
);

const getComments: IController = asyncController(
  async (req: Request, res: Response) => {
    const user = Number(req.headers.user);
    const comments = await commentService.getComments(user);
    ApiResponse.success(res, { comments }, 200);
  }
);

const upvoteComment: IController = asyncController(
  async (req: Request, res: Response) => {
    const commentId: number = Number(req.params.commentId);
    const { parentId }: { parentId: number } = req.body;
    const upvotedBy: number = Number(req.headers.user) as number;
    const upvote = await commentService.upvoteComment(
      commentId,
      upvotedBy,
      parentId
    );
    ApiResponse.success(res, { upvote }, 200);
  }
);

export default {
  createComment,
  getComments,
  upvoteComment,
};
