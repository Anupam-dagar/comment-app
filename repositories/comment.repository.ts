import dbConfig from "../config/db";
import { Comment } from "../entities/comments";
import { User } from "../entities/user";

const CommentRepository = dbConfig.getRepository(Comment).extend({
  async createComment(comment: Comment) {
    const result = await this.createQueryBuilder(Comment.name)
      .insert()
      .into(Comment)
      .values([comment])
      .execute();
    return result.generatedMaps[0];
  },

  async getComments() {
    return this.createQueryBuilder(Comment.name)
      .innerJoinAndSelect(`${Comment.name}.user`, User.name)
      .getMany();
  },
});

export default CommentRepository;
