import MovieListRepository from "../repository/movieList.repository";
import { getCustomRepository } from "typeorm";

export class IRequest {
  title: string;
  description: string;
  image_url: string;
  moviesId: Array<string>;
}

export const saveMovieList = (userId: string, movieList: IRequest) =>
  getCustomRepository(MovieListRepository).save({
    user: { id: userId },
    ...movieList
  });

export const getListsByUserId = (userId: string) =>
  getCustomRepository(MovieListRepository).getListsByUserId(userId);

export const getOwnUserLists = (userId: string) =>
  getCustomRepository(MovieListRepository).find({
    where: { user: { id: userId } }
  });

export const deleteMovieList = (movieListId: string) =>
  getCustomRepository(MovieListRepository).delete({ id: movieListId });
