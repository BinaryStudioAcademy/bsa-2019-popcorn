import { getCustomRepository } from "typeorm";
import { Review } from "../models/Review/ReviewModel";
import ReviewRepository from "../repository/review.repository";
import { getById as getMovieElasticById } from "../repository/movieElastic.repository";
import UserRepository from "../repository/user.repository";
import ReviewReactionRepository from "../repository/reviewReaction.repository";

interface IRequestBody {
  userId: string;
  movieId: string;
  text: string;
}

const sortReviewsByLikes = (a, b) => {
  const diffCountLikes = b.reaction.countLikes - a.reaction.countLikes;

  if (!diffCountLikes) {
    return +b.analysis - +a.analysis;
  }

  return diffCountLikes;
};

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
  userId: string,
  next
): Promise<any> => {
  const movie = await getMovieElasticById(movieId);
  if (!movie) {
    return next(
      { status: 404, message: `Movie with id ${movieId} does not exist` },
      null
    );
  }

  let reviews = await getCustomRepository(ReviewRepository).getReviewsByMovieId(
    movieId,
    next
  );

  reviews = await addReactionsToReviews(userId, reviews);
  reviews.sort(sortReviewsByLikes);

  return reviews;
};

const addReactionsToReviews = async (userId: string, reviews: any) =>
  Promise.all(
    reviews.map(async review => {
      const reaction = await getCustomRepository(
        ReviewReactionRepository
      ).getReactionByReviewId(review.id, userId);
      review.reaction = reaction;
      return review;
    })
  );

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

export const getReviewById = async (userId: string, id: string, next) => {
  const review = await getCustomRepository(ReviewRepository).getReviewById(
    id,
    next
  );
  const movie = await getMovieElasticById(review[0].movieId);
  review.movie = movie.hits.hits[0]._source;
  const reviewWithReactions = await addReactionsToReviews(userId, review);
  return { review: reviewWithReactions, movie: movie.hits.hits[0]._source };
};

export const deleteReviewById = async (id: string, next) => {
  return await getCustomRepository(ReviewRepository).deleteReviewById(id, next);
};

export const getReviewsByUserId = async (id: string, next) => {
  const user = await getCustomRepository(UserRepository).findOne({ id });
  if (!user) {
    return next(
      { status: 404, message: `User with id ${id} does not exist` },
      null
    );
  }
  const reviews = await getCustomRepository(
    ReviewRepository
  ).getReviewsByUserId(id, next);
  const objectWithMovieId = {};
  for (const review of reviews) {
    objectWithMovieId[review.movieId] = true;
  }
  const idValues = [...Object.keys(objectWithMovieId)];
  const elasticMovies = await Promise.all(
    idValues.map(id => getMovieElasticById(id))
  );
  let result = reviews.map(review => {
    const index = idValues.findIndex(item => item === review.movieId);
    review.movie = elasticMovies[index].hits.hits[0]._source;
    return review;
  });

  result = addReactionsToReviews(id, result);

  return result;
};

export const setNewReaction = async (
  userId: string,
  { reviewId, isLike },
  next
) => {
  const reaction = await getCustomRepository(ReviewReactionRepository).findOne({
    where: {
      user: { id: userId },
      review: { id: reviewId }
    }
  });
  if (!reaction) {
    await getCustomRepository(ReviewReactionRepository).save({
      user: { id: userId },
      review: { id: reviewId },
      isLike
    });
  }
  if (reaction) {
    if (reaction.isLike === isLike) {
      await getCustomRepository(ReviewReactionRepository).deleteReactionById(
        reaction.id,
        next
      );
      isLike = null;
    } else {
      await getCustomRepository(ReviewReactionRepository).updateReactionById(
        reaction.id,
        isLike,
        next
      );
    }
  }
  const result = await getCustomRepository(
    ReviewReactionRepository
  ).getCountLikesDislikes(reviewId);
  return { ...result, userLike: isLike };
};
