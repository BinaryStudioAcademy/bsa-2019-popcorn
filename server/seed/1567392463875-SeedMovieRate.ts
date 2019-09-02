import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import MovieRateRepository from "../repository/movieRate.repository";
const uuid = require("uuid/v4");
export class SeedMovieRate1567392463875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const movieId = 297;
    const rates = [1, 2, 3, 4, 5];
    let movieRates = [];
    for (let i = 0; i < 100; i++) {
      const rate = rates[Math.floor(Math.random() * rates.length)];
      movieRates.push({ movieId, rate, userId: uuid() });
    }
    await getCustomRepository(MovieRateRepository).save(movieRates);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
