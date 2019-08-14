import { Movie } from "../models/MovieModel";
import MovieRepository from "../repository/movie.repository";
import { getCustomRepository, Like } from "typeorm";
import * as elasticRepository from "../repository/movieElastic.repository";

export const getMovies = async (): Promise<Movie[]> => {
  let data = await elasticRepository.get();

  data = data.hits.hits;

  return data.map(movie => movie._source);
};

export const getMovieById = async (movieId: number): Promise<Movie> =>
  await getCustomRepository(MovieRepository).findOne(movieId);

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

export const getByTitle = async (title: string): Promise<Movie[]> =>
  await elasticRepository.getByTitle(title);
