import { plainToClass } from "class-transformer";
import { Comment } from "../entities/comments";
import { CreateComment } from "../models/comment.model";

const mapCreateCommentToCommentEntity = (
  comment: CreateComment,
  createdBy: string
) => {
  return plainToClass(Comment, {
    createdBy,
    comment: comment.comment,
  });
};

export default {
  mapCreateCommentToCommentEntity,
};
