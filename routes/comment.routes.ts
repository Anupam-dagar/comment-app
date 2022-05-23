import express from "express";
import commentController from "../controllers/comment.controller";
import joiValidator from "express-joi-validation";
import commentSchema from "../models/requestSchema/comment.schema";

const router = express.Router();
const validator = joiValidator.createValidator();

router.post(
  "/",
  validator.body(commentSchema.createCommentBody),
  commentController.createComment
);

export default router;
