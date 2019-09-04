import { EntityRepository, Repository } from "typeorm";
import { MovieList } from "../entities/MovieList";

@EntityRepository(MovieList)
class MovieListRepository extends Repository<MovieList> {
  getListsByUserId = (userId: string) =>
    this.createQueryBuilder("movie_list")
      .addOrderBy("movie_list.createdAt", "DESC")
      .leftJoin("movie_list.user", "user")
      .addSelect(["user.id", "user.name", "user.avatar"])
      .where("movie_list.isPrivate = :isPrivate", { isPrivate: false })
      .andWhere("movie_list.user.id = :userId", { userId })
      .getMany();

  getListById = (movieListId: string) =>
    this.createQueryBuilder("movie_list")
      .addOrderBy("movie_list.createdAt", "DESC")
      .leftJoin("movie_list.user", "user")
      .addSelect(["user.id", "user.name", "user.avatar"])
      .where("movie_list.id = :movieListId", { movieListId })
      .getOne();
}

export default MovieListRepository;
