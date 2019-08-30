import { EntityRepository, Repository } from "typeorm";
import { MovieList } from "../entities/MovieList";

export class IRequest {
  title: string;
  description: string;
  image_url: string;
  moviesId: Array<string>;
}

@EntityRepository(MovieList)
class MovieListRepository extends Repository<MovieList> {
  saveMovieList(userId: string, movieList: IRequest, next) {
    try {
      const newMovieList = this.save({
        user: { id: userId },
        ...movieList
      });
      return newMovieList;
    } catch (err) {
      return next({ status: err.status, message: err.message }, null);
    }
  }
}

export default MovieListRepository;
