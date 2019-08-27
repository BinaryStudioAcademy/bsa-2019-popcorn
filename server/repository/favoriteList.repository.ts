import { EntityRepository, Repository } from "typeorm";
import { FavoriteList } from "../entities/FavoriteList";

@EntityRepository(FavoriteList)
class FavoriteListRepository extends Repository<FavoriteList> {
  async getFavoriteMoviesByUserId(id: string, next?) {}
  async updateFavoriteMoviesByUserId(
    id: string,
    favoriteMoviesIds: Array<number>,
    next?
  ) {}
}

export default FavoriteListRepository;
