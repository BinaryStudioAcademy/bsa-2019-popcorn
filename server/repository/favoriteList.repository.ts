import { EntityRepository, Repository } from "typeorm";
import { FavoriteList } from "../entities/FavoriteList";

@EntityRepository(FavoriteList)
class FavoriteListRepository extends Repository<FavoriteList> {
  async updateFavoriteMoviesByUserId(
    id: string,
    favoriteMoviesIds: number[],
    next?
  ) {
    await this.createQueryBuilder("favoriteList")
      .delete()
      .where("user.id = :id", { id })
      .execute();

    if (favoriteMoviesIds.length > 0) {
      await this.createQueryBuilder("favoriteList")
        .insert()
        .values(favoriteMoviesIds.map(movieId => ({ user: { id }, movieId })))
        .execute();
    }
  }
}

export default FavoriteListRepository;
