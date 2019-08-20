import { getCustomRepository } from "typeorm";
import { Review } from "../models/ReviewModel";
import ReviewRepository from "../repository/review.repository";
import UserRepository from "../repository/user.repository";

interface IRequestBody {
  userId: string;
  movieId: string;
  text: string;
}

export const createReview = async (
  requestBody: IRequestBody,
  next
): Promise<any> => {
  const { movieId, userId, text } = requestBody;
  return await getCustomRepository(ReviewRepository).createReview(
    userId,
    movieId,
    text,
    next
  );
};
