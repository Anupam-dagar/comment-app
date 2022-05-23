import dbConfig from "../config/db";
import { Comment } from "../entities/comments";

const CommentRepository = dbConfig.getRepository(Comment).extend({
  async createComment(comment: Comment) {
    return this.createQueryBuilder(Comment.name)
      .insert()
      .into(Comment)
      .values([comment])
      .execute();
  },
});

export default CommentRepository;
