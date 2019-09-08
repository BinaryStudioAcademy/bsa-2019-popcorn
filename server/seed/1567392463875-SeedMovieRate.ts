import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import MovieRateRepository from "../repository/movieRate.repository";
import UserRepository from "../repository/user.repository";

export class SeedMovieRate1567392463875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const moviesId = [
      297,
      302,
      306,
      307,
      310,
      314,
      322,
      329,
      332,
      339,
      336,
      333,
      348,
      345
    ];
    const users = await getCustomRepository(UserRepository).find({
      select: ["id"]
    });
    const movieRates = [];

    for (const id of moviesId) {
      for (const user of users) {
        const rate = Math.floor(1 + Math.random() * 10);
        const userId = user.id;
        const movieId = id;
        movieRates.push({ rate, userId, movieId });
      }
    }

    await getCustomRepository(MovieRateRepository).save(movieRates);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
