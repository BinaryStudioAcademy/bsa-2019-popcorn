import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import MovieRateRepository from "../repository/movieRate.repository";
import UserRepository from "../repository/user.repository";

export class SeedMovieRate1567392463875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const movieId = 297;
    const rates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const movieRates = [];
    const usersId = await getCustomRepository(UserRepository).find({
      select: ["id"]
    });
    for (let i = 0; i < 100; i++) {
      const rate = rates[Math.floor(Math.random() * rates.length)];
      movieRates.push({
        movieId,
        rate,
        userId: usersId[Math.floor(Math.random() * usersId.length)].id
      });
    }
    await getCustomRepository(MovieRateRepository).save(movieRates);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
