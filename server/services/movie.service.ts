import { Movie } from "../models/MovieModel";
import { MovieRate } from "../models/MovieRateModel/movieRateModel";
import MovieRepository from "../repository/movie.repository";
import MovieRateRepository from "../repository/movieRate.repository";
import { getCustomRepository, Like, getRepository } from "typeorm";
import * as elasticRepository from "../repository/movieElastic.repository";

export const getMovies = async ({ size, from }): Promise<any[]> => {
  let data = await elasticRepository.get(size, from);

  data = data.hits.hits;

  return data.map(movie => movie._source);
};

export const getMovieById = async (movieId: string): Promise<any> => {
  const data = await elasticRepository.getById(movieId);
  const movie = data.hits.hits[0]._source;
  const rate = await getCustomRepository(MovieRateRepository)
    .createQueryBuilder("movieRate")
    .select("AVG(movieRate.rate)", "average")
    .where("movieRate.movieId = :id", { id: movie.id })
    .getRawOne();
  movie.rate = rate ? parseFloat(rate.average).toFixed(2) : null;
  return movie;
};

export const createMovie = async (movie: Movie): Promise<Movie[]> =>
  await getCustomRepository(MovieRepository).save([movie]);

export const updateMovie = async (updatedMovie: Movie): Promise<Movie[]> => {
  let movie = await getCustomRepository(MovieRepository).findOne(
    updatedMovie.id
  );
  movie = updatedMovie;
  return await getCustomRepository(MovieRepository).save([movie]);
};

export const deleteMovieById = async (movieId: number): Promise<Movie> => {
  const movie = await getCustomRepository(MovieRepository).findOne(movieId);
  return await getCustomRepository(MovieRepository).remove(movie);
};

export const getByTitle = async (title: string): Promise<Movie[]> => {
  let data = await elasticRepository.getByTitle(title);

  data = data.hits.hits;
  const movies = data.map(movie => movie._source);
  let moviesSet = new Map();
  movies.forEach(movie => {
    moviesSet.set(movie.id, movie);
  });
  let response = [];
  for (let movie of moviesSet.values())
    response.push(movie);
  return response;
};

export const saveMovieRate = async (newRate: any) => {
  const { movieId, userId } = newRate;
  const rateInDB = await getCustomRepository(MovieRateRepository).findOne({
    movieId,
    userId
  });
  if (rateInDB) {
    rateInDB.rate = newRate.rate;
    return await getCustomRepository(MovieRateRepository).update(
      { id: rateInDB.id },
      { ...rateInDB }
    );
  }
  return await getCustomRepository(MovieRateRepository).save(newRate);
};

export const getMovieRate = async (
  userId: string,
  movieId: string
): Promise<any> => {
  const data = await getCustomRepository(MovieRateRepository).findOne({
    userId,
    movieId
  });
  if (data) return data;
  return { userId, movieId, rate: 0 };
};
