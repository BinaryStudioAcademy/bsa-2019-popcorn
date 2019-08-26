import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";
import FavoriteListRepository from "../repository/favoriteList.repository";
import { FavoriteList } from "../models/FavoriteListModel";

export class SeedFavoriteList1566841720412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const users = await getCustomRepository(UserRepository).find();
    const movieIds = [
      10551,
      11417,
      44181,
      21867,
      57834,
      11899,
      44783,
      25676,
      55735,
      9062,
      38219,
      39434,
      54007,
      12559,
      52229,
      20735,
      29044,
      550,
      10254,
      14286,
      79090,
      15984,
      24499,
      29778,
      89453,
      65046,
      15395,
      11853,
      31591,
      27593,
      22705
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
