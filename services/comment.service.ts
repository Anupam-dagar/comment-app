import { CreateComment } from "../models/comment.model";
import { DbError } from "../models/errors/db.error";
import CommentRepository from "../repositories/comment.repository";
import UpvotesRepository from "../repositories/upvotes.repository";
import mappingUtilities from "../utils/mapping.utilities";

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

const getComments = async () => {
  try {
    return CommentRepository.getComments();
  } catch (error) {
    throw new DbError(`Error getting comments: ${error}`);
  }
};

const upvoteComment = async (commentId: number, upvotedBy: number) => {
  const existingUpvote = await UpvotesRepository.getUpvote(
    commentId,
    upvotedBy
  );
  if (existingUpvote) {
    try {
      return await UpvotesRepository.removeUpvote(commentId, upvotedBy);
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
    return await UpvotesRepository.upvoteComment(upvoteEntity);
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
