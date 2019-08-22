import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { Review } from "../entities/Review";
import UserRepository from "../repository/user.repository";
import { getRatingByReview } from "../services/reviewAnalysis.service";

@EntityRepository(Review)
class ReviewRepository extends Repository<Review> {
  async createReview(userId: string, movieId: string, text: string, next) {
    try {
      const user = await getCustomRepository(UserRepository).findOne(userId);
      if (!user) {
        return next({ status: 404, message: "User is not found" }, null);
      }
      const ratingValue = getRatingByReview(text, next);
      const analysis = ratingValue.result.toFixed(2);

      return await this.save({ user, movieId, text, analysis });
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }

  async getReviewsByMovieId(movieId: string, next) {
    try {
      return await this.find({
        where: { movieId: movieId },
        relations: ["user"],
        order: { created_at: "DESC" }
        // select: { text: true, movieId: true, user: { id: true } }
      });
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }

  async getReviewByMovieIdUserId(userId: string, movieId: string, next) {
    try {
      const data = await this.findOne({
        where: { movieId: movieId, user: { id: userId } },
        relations: ["user"]
        // select: { text: true, movieId: true, user: { id: true } }
      });
      if (!data) {
        return {};
      }
      return data;
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }

  async updateReviewById(id: string, bodyRequest: any, next) {
    try {
      const ratingValue = getRatingByReview(bodyRequest.text, next);
      bodyRequest.analysis = ratingValue.result.toFixed(2);
      const data = await this.update({ id }, bodyRequest);
      const updatedReview = await this.getReviewById(id, next);
      return updatedReview
        ? updatedReview
        : next({ status: 404, message: "Review was not found" }, null);
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }

  async getReviewById(id: string, next) {
    try {
      const data = await this.find({
        where: { id: id },
        relations: ["user"]
      });
      if (!data) {
        return next(
          { status: 404, message: "Review with that id not found" },
          null
        );
      }
      return data;
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }

  async deleteReviewById(id: string, next) {
    try {
      const data = await this.getReviewById(id, next);
      if (!data) {
        return next(
          { status: 404, message: "Review with that id not found" },
          null
        );
      }
      await this.delete({ id });
      return { id };
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }

  async getReviewsByUserId(id: string, next) {
    try {
      const data = await this.find({
        where: { user: { id } },
        order: { created_at: "DESC" },
        relations: ["user"]
      });
      if (!data) {
        return next({ status: 404, message: "No one reviews" }, null);
      }
      return data;
    } catch (err) {
      return next({ status: err.status, message: err.message });
    }
  }
}

export default ReviewRepository;
