import { plainToClass } from "class-transformer";
import { Comment } from "../entities/comments";
import { Upvotes } from "../entities/upvotes";
import { CreateComment } from "../models/comment.model";

const mapCreateCommentToCommentEntity = (
  comment: CreateComment,
  createdBy: number
) => {
  return plainToClass(Comment, {
    createdBy,
    comment: comment.comment,
  });
};

const mapDataToCommentUpvotesEntity = (
  commentId: number,
  upvotedBy: number
) => {
  return plainToClass(Upvotes, {
    commentId,
    upvotedBy,
  });
};

export default {
  mapCreateCommentToCommentEntity,
  mapDataToCommentUpvotesEntity,
};
