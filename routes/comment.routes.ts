import express from "express";
import commentController from "../controllers/comment.controller";
import joiValidator from "express-joi-validation";
import commentSchema from "../models/requestSchema/comment.schema";
import headersSchema from "../models/requestSchema/headers.schema";

const router = express.Router();
const validator = joiValidator.createValidator();

router.post(
  "/",
  validator.headers(headersSchema.authoriseSchema),
  validator.body(commentSchema.createCommentBody),
  commentController.createComment
);

router.post(
  "/upvote/:commentId",
  validator.headers(headersSchema.authoriseSchema),
  commentController.upvoteComment
);

router.get(
  "/",
  validator.headers(headersSchema.authoriseSchema),
  commentController.getComments
);

export default router;
