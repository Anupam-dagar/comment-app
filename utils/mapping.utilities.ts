import { plainToClass } from "class-transformer";
import { Comment } from "../entities/comments";
import { Upvotes } from "../entities/upvotes";
import {
  CreateComment,
  Comment as CommentModel,
} from "../models/comment.model";

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

const mapCommentEntityToCommentModel = (
  comments: Comment[],
  userId: number
): CommentModel[] => {
  const commentModels: CommentModel[] = [];

  return comments.map((comment) => {
    let hasUpvoted = false;
    for (const upvote of comment.upvotes) {
      if (upvote.upvotedBy === userId) {
        hasUpvoted = true;
        break;
      }
    }

    return {
      hasUpvoted,
      id: comment.id,
      comment: comment.comment,
      createdBy: comment.createdBy,
      createdAt: comment.createdAt,
      user: comment.user,
      totalUpvotes: comment.totalUpvotes,
    } as CommentModel;
  });
};

export default {
  mapCreateCommentToCommentEntity,
  mapDataToCommentUpvotesEntity,
  mapCommentEntityToCommentModel,
};
