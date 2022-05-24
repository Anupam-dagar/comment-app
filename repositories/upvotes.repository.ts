import dbConfig from "../config/db";
import { Upvotes } from "../entities/upvotes";

const UpvotesRepository = dbConfig.getRepository(Upvotes).extend({
  async upvoteComment(upvote: Upvotes) {
    const result = await this.createQueryBuilder(Upvotes.name)
      .insert()
      .into(Upvotes)
      .values([upvote])
      .execute();
    return result.generatedMaps[0];
  },

  async removeUpvote(commentId: number, upvotedBy: number) {
    const result = await this.createQueryBuilder(Upvotes.name)
      .update(Upvotes)
      .set({ deleted_token: new Date().toISOString() })
      .where(`${Upvotes.name}.commentId = :commentId`, { commentId })
      .andWhere(`${Upvotes.name}.upvotedBy = :upvotedBy`, { upvotedBy })
      .execute();
    return result.generatedMaps[0];
  },

  async getUpvote(commentId: number, upvotedBy: number) {
    return this.createQueryBuilder(Upvotes.name)
      .where(`${Upvotes.name}.commentId = :commentId`, { commentId })
      .andWhere(`${Upvotes.name}.upvotedBy = :upvotedBy`, { upvotedBy })
      .andWhere(`${Upvotes.name}.deleted_token is null`)
      .getOne();
  },
});

export default UpvotesRepository;
