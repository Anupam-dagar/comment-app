import { CreateComment } from "../models/comment.model";
import { DbError } from "../models/errors/db.error";
import { UpvoteType } from "../models/upvote.model";
import CommentRepository from "../repositories/comment.repository";
import UpvotesRepository from "../repositories/upvotes.repository";
import mappingUtilities from "../utils/mapping.utilities";
import websocket from "../websocket/server";

const createComment = async (comment: CreateComment, createdBy: number) => {
  const commentEntity = mappingUtilities.mapCreateCommentToCommentEntity(
    comment,
    createdBy
  );

  try {
    return await CommentRepository.createComment(commentEntity);
  } catch (error) {
    throw new DbError(`Error creating comment by user: ${createdBy}: ${error}`);
  }
};

const getComments = async (userId: number) => {
  try {
    const comments = await CommentRepository.getComments();
    const commentModels = mappingUtilities.mapCommentEntityToCommentModel(
      comments,
      userId
    );
    return commentModels.filter((commentModel) => !commentModel.parentId);
  } catch (error) {
    throw new DbError(`Error getting comments: ${error}`);
  }
};

const upvoteComment = async (
  commentId: number,
  upvotedBy: number,
  parentId?: number
) => {
  const existingUpvote = await UpvotesRepository.getUpvote(
    commentId,
    upvotedBy
  );
  if (existingUpvote) {
    try {
      const upvoteResult = await UpvotesRepository.removeUpvote(
        commentId,
        upvotedBy
      );
      websocket.emitUpvoteComment({
        commentId,
        parentId,
        type: UpvoteType.DOWNVOTE,
      });
      return upvoteResult;
    } catch (error) {
      throw new DbError(
        `Error removing upvote from comment ${commentId} for user:${upvotedBy} : ${error}`
      );
    }
  }

  const upvoteEntity = mappingUtilities.mapDataToCommentUpvotesEntity(
    commentId,
    upvotedBy
  );
  try {
    const upvoteResult = await UpvotesRepository.upvoteComment(upvoteEntity);
    websocket.emitUpvoteComment({
      commentId,
      parentId,
      type: UpvoteType.UPVOTE,
    });
    return upvoteResult;
  } catch (error) {
    throw new DbError(
      `Error upvoting comment ${commentId} for user ${upvotedBy} : ${error}`
    );
  }
};

export default {
  createComment,
  getComments,
  upvoteComment,
};
