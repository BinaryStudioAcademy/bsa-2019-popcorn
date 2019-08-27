import { EntityRepository, Repository } from "typeorm";
import { FavoriteList } from "../entities/FavoriteList";

@EntityRepository(FavoriteList)
class FavoriteListRepository extends Repository<FavoriteList> {
  async updateFavoriteMoviesByUserId(
    id: string,
    favoriteMoviesIds: Array<number>,
    next?
  ) {
    await this.createQueryBuilder("favoriteList")
      .delete()
      .where("user.id = :id", { id })
      .insert()
      .values(favoriteMoviesIds.map(movieId => ({ user: { id }, movieId })))
      .execute();
  }
}

export default FavoriteListRepository;
