import { CreateComment } from "../models/comment.model";
import { DbError } from "../models/errors/db.error";
import CommentRepository from "../repositories/comment.repository";
import mappingUtilities from "../utils/mapping.utilities";

const createComment = async (comment: CreateComment, createdBy: string) => {
  const commentEntity = mappingUtilities.mapCreateCommentToCommentEntity(
    comment,
    createdBy
  );

  try {
    await CommentRepository.createComment(commentEntity);
  } catch (error) {
    throw new DbError(`Error creating comment by user: ${createdBy}: ${error}`);
  }
};

export default {
  createComment,
};
