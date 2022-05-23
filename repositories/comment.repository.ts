import dbConfig from "../config/db";
import { Comment } from "../entities/comments";
import { User } from "../entities/user";

const CommentRepository = dbConfig.getRepository(Comment).extend({
  async createComment(comment: Comment) {
    return this.createQueryBuilder(Comment.name)
      .insert()
      .into(Comment)
      .values([comment])
      .execute();
  },

  async getComments() {
    return this.createQueryBuilder(Comment.name)
      .innerJoinAndSelect(`${Comment.name}.user`, User.name)
      .getMany();
  },
});

export default CommentRepository;
