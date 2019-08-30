import MovieListRepository, {
  IRequest
} from "../repository/movieList.repository";
import { getCustomRepository } from "typeorm";

export const saveMovieList = (userId: string, movieList: IRequest, next) =>
  getCustomRepository(MovieListRepository).saveMovieList(
    userId,
    movieList,
    next
  );
