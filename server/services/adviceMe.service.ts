import {
  getByGTRating,
  getByGTRatingAndGenre
} from "../repository/movieElastic.repository";
import { getRandomFromArray, getRandomNumber } from "../helpers/random.helper";
import { User } from "../models/UserModel";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";
import { getWatched } from "./watch.service";

const minimalRating = "6";
const amount = 3;

export const getAdviceMovie = async (userId: string, next) => {
  const user: User = await getCustomRepository(UserRepository).findOne(userId);
  if (user && user.id !== userId) {
    return getRandomMovie(amount);
  }
  const list = (await getWatched(user.id, next)).sort((elem1, elem2) => {
    return elem2.movie.vote_average - elem1.movie.vote_average;
  });

  console.log(list.length);
  return list.length >= 3
    ? await getMoviesFromList(list, minimalRating)
    : await getRandomMovie(amount);
};

const getRandomMovie = async amountOfMovie => {
  const movies: any[] = (
    (await getByGTRating(minimalRating)).hits.hits || []
  ).map(movie => movie._source);

  return getRandomFromArray(movies, amountOfMovie);
};

const getMoviesFromList = async (list: any[], rating: string) => {
  return await Promise.all(
    list.splice(0, amount).map(async movie => await movieByGenre(movie, rating))
  );
};

const movieByGenre = async (list: any, rating: string) => {
  let genres = "";
  if (list.movie.genres) {
    genres = JSON.parse(list.movie.genres)[0].name;
  }

  const movies = (
    (await getByGTRatingAndGenre(rating, genres)) || []
  ).hits.hits.map(movie => movie._source);

  return movies[getRandomNumber(0, movies.length - 1)];
};
