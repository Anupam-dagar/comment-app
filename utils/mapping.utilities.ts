import { plainToClass } from "class-transformer";
import { Comment } from "../entities/comments";
import { Upvotes } from "../entities/upvotes";
import {
  CreateComment,
  Comment as CommentModel,
} from "../models/comment.model";
import commentUtilities from "./comment.utilities";

const mapCreateCommentToCommentEntity = (
  comment: CreateComment,
  createdBy: number
) => {
  return plainToClass(Comment, {
    createdBy,
    comment: comment.comment,
    parentId: comment.parentId,
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
  const commentsMap =
    commentUtilities.generateCommentMapForChildComments(comments);

  return comments.map((comment) => {
    let hasUpvoted = false;
    for (const upvote of comment.upvotes) {
      if (upvote.upvotedBy === userId) {
        hasUpvoted = true;
        break;
      }
    }

    const subCommentsModel = mapCommentEntityToCommentModel(
      commentsMap.get(comment.id) ?? [],
      userId
    );

    return {
      hasUpvoted,
      id: comment.id,
      comment: comment.comment,
      createdBy: comment.createdBy,
      createdAt: comment.createdAt,
      user: comment.user,
      totalUpvotes: comment.totalUpvotes,
      subComments: subCommentsModel,
      parentId: comment.parentId,
    } as CommentModel;
  });
};

export default {
  mapCreateCommentToCommentEntity,
  mapDataToCommentUpvotesEntity,
  mapCommentEntityToCommentModel,
};
