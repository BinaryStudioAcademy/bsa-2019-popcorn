import { getCustomRepository } from "typeorm";
import { Review } from "../models/ReviewModel";
import ReviewRepository from "../repository/review.repository";
import { getById as getMovieElasticById } from "../repository/movieElastic.repository";

interface IRequestBody {
  userId: string;
  movieId: string;
  text: string;
}

export const createReview = async (
  requestBody: IRequestBody,
  next
): Promise<Review> => {
  const { movieId, userId, text } = requestBody;
  return await getCustomRepository(ReviewRepository).createReview(
    userId,
    movieId,
    text,
    next
  );
};

export const getReviewsByMovieId = async (
  movieId: string,
  next
): Promise<any> => {
  let movie = await getMovieElasticById(movieId);
  if (!movie) {
    return next(
      { status: 404, message: `Movie with id ${movieId} does not exist` },
      null
    );
  }
  movie = movie.hits.hits[0]._source;
  const reviews = await getCustomRepository(
    ReviewRepository
  ).getReviewsByMovieId(movieId, next);
  return { reviews, movie };
};

export const getReviewByMovieIdUserId = async (
  userId: string,
  movieId: string,
  next
) =>
  await getCustomRepository(ReviewRepository).getReviewByMovieIdUserId(
    userId,
    movieId,
    next
  );

export const updateReviewById = async (
  id: string,
  bodyRequest: IRequestBody,
  next
) => {
  return await getCustomRepository(ReviewRepository).updateReviewById(
    id,
    bodyRequest,
    next
  );
};

export const getReviewById = async (id: string, next) => {
  return await getCustomRepository(ReviewRepository).getReviewById(id, next);
};

export const deleteReviewById = async (id: string, next) => {
  return await getCustomRepository(ReviewRepository).deleteReviewById(id, next);
};
