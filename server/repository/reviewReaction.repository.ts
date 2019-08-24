import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { ReviewReaction } from "../entities/Review/ReviewReaction";

@EntityRepository(ReviewReaction)
class ReviewReactionRepository extends Repository<ReviewReaction> {
  async getCountLikesDislikes(reviewId) {
    try {
      const likes = await this.createQueryBuilder("reaction")
        .select("COUNT(reaction.isLike)", "count")
        .where("reaction.review.id = :id", { id: reviewId })
        .andWhere("reaction.isLike = :isLike", { isLike: true })
        .getRawOne();
      const dislikes = await this.createQueryBuilder("reaction")
        .select("COUNT(reaction.isLike)", "count")
        .where("reaction.review.id = :id", { id: reviewId })
        .andWhere("reaction.isLike = :isLike", { isLike: false })
        .getRawOne();
      return {
        countLikes: likes.count,
        countDislikes: dislikes.count
      };
    } catch (error) {}
  }

  async deleteReactionById(reactionId, next) {
    try {
      await this.createQueryBuilder()
        .delete()
        .from(ReviewReaction)
        .where("id = :id", { id: reactionId })
        .execute();
      return;
    } catch (error) {
      return next(
        {
          status: 404,
          message: `Reaction with id ${reactionId} does not exist`
        },
        null
      );
    }
  }

  async updateReactionById(reactionId, isLike, next) {
    try {
      await this.createQueryBuilder()
        .update(ReviewReaction)
        .set({ isLike })
        .where("id = :id", { id: reactionId })
        .execute();
      return;
    } catch (error) {
      return next(
        {
          status: 404,
          message: `Reaction with id ${reactionId} does not exist`
        },
        null
      );
    }
  }
}

export default ReviewReactionRepository;
