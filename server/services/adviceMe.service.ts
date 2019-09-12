import {
  getByGTRating,
  getByGTRatingAndGenre
} from "../repository/movieElastic.repository";
import { getRandomFromArray, getRandomNumber } from "../helpers/random.helper";
import { User } from "../models/UserModel";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";
import { getWatched } from "./watch.service";
import { getMovieVideoLinkById } from "../repository/movie.repository";

const minimalRating = "5";
const amount = 3;

const movieFromList = (movies: any[], list: any[]): boolean => {
  return list.some(
    movieItem =>
      movies.filter(movie => {
        console.log(movieItem.id);
        return movie.id === movieItem.id;
      }).length !== 0
  );
};

export const getAdviceMeList = async (userId: string, next) => {
  const movies = await getAdviceMovie(userId, next);

  let adviceMovies = await addVideoLinkToMovies(movies);

  // while(movieFromList(adviceMovies, movies)){
  //   adviceMovies = await addVideoLinkToMovies(movies);
  // }

  return adviceMovies;
};

const addVideoLinkToMovies = async (movies: any) =>
  Promise.all(
    movies.map(async movie => {
      const video_link = await getMovieVideoLinkById(movie.id);
      movie.video_link = video_link;
      return movie;
    })
  );

export const getAdviceMovie = async (userId: string, next) => {
  const user: User = await getCustomRepository(UserRepository).findOne(userId);
  if (user && user.id !== userId) {
    return getRandomMovie(amount);
  }
  const list = (await getWatched(user.id, next)).sort((elem1, elem2) => {
    return elem2.movie.vote_average - elem1.movie.vote_average;
  });

  return list.length >= 3
    ? await getMoviesFromList(list, minimalRating, amount)
    : await getRandomMovie(amount);
};

const getRandomMovie = async amountOfMovie => {
  const movies: any[] = (
    (await getByGTRating(minimalRating)).hits.hits || []
  ).map(movie => movie._source);

  return getRandomFromArray(movies, amountOfMovie);
};

const getMoviesFromList = async (
  list: any[],
  rating: string,
  amountOfMovie: number
) => {
  console.log(list);
  return await Promise.all(
    list[getRandomNumber(0, list.length / 2 - 1)].map(
      async movie => await movieByGenre(movie, rating, amountOfMovie)
    )
  );
};

const movieByGenre = async (
  list: any,
  rating: string,
  amountOfMovie: number
) => {
  let genres = "";
  if (list.movie.genres) {
    const parsed = JSON.parse(list.movie.genres);
    genres = parsed ? parsed[0].name : "";
  }

  const movies = (
    (await getByGTRatingAndGenre(rating, genres)) || []
  ).hits.hits.map(movie => movie._source);

  getRandomFromArray(movies, amountOfMovie);
};
