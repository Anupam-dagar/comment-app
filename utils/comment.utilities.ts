import { Comment } from "../entities/comments";

const generateCommentMapForChildComments = (comments: Comment[]) => {
  const commentsMap = new Map<number, Comment[]>();
  comments.forEach((comment) => {
    if (comment.parentId) {
      let subComments = commentsMap.get(comment.parentId);
      if (!subComments) {
        commentsMap.set(comment.parentId, []);
        subComments = [];
      }
      commentsMap.set(comment.parentId, [...subComments, comment]);
    }
  });

  return commentsMap;
};

export default {
  generateCommentMapForChildComments,
};
