import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";
import FavoriteListRepository from "../repository/favoriteList.repository";
import { FavoriteList } from "../models/FavoriteListModel";

export class SeedFavoriteList1566841720412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const users = await getCustomRepository(UserRepository).find();
    const movieIds = [
      297,
      302,
      306,
      307,
      329,
      333,
      345,
      468,
      501,
      270,
      397,
      294,
      280,
      506,
      350,
      310,
      339,
      346,
      471,
      508,
      380
    ];

    for (const user of users) {
      const listMoviesIds = [];
      const listLength = Math.floor(Math.random() * movieIds.length);
      for (let i = 0; i < listLength; i++) {
        const movieId = movieIds[Math.floor(Math.random() * movieIds.length)];
        if (listMoviesIds.indexOf(movieId) === -1) {
          listMoviesIds.push(movieId);
        }
      }
      for (let i = 0; i < listMoviesIds.length; i++) {
        const favoriteList = new FavoriteList();
        favoriteList.user = user;
        favoriteList.movieId = listMoviesIds[i];
        await getCustomRepository(FavoriteListRepository).save(favoriteList);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
