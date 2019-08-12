import { Movie } from "../models/MovieModel";
import MovieRepository from "../repository/movie.repository";
import { getCustomRepository, Like } from "typeorm";

export const getMovies = async (): Promise<Movie[]> =>
  await getCustomRepository(MovieRepository).find();

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

export const getByTitle = async (title: string): Promise<Movie[]> => {
  return await getCustomRepository(MovieRepository).find({
    where: { title: Like("%" + title + "%") }
  });
};
