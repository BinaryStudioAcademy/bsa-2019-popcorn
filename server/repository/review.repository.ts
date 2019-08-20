import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { Review } from "../entities/Review";
import UserRepository from "./user.repository";

@EntityRepository(Review)
class ReviewRepository extends Repository<Review> {
  async createReview(userId: string, movieId: string, text: string, next) {
    try {
      const user = await getCustomRepository(UserRepository).findOne(userId);
      if (!user) {
        return next({ status: 404, message: "User is not found" }, null);
      }
      return await this.save({ user, movieId, text });
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }

  async getReviewsByMovieId(movieId: string, next) {
    try {
      return await getCustomRepository(ReviewRepository).find({
        where: { movieId: movieId },
        relations: ["user"]
        // select: { text: true, movieId: true, user: { id: true } }
      });
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }
}

export default ReviewRepository;
