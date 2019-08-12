import { getCustomRepository, MigrationInterface, QueryRunner } from "typeorm";
import MovieRepository from "../repository/movie.repository";
import * as mockService from "../services/mock.service";

export class SeedMovies1565181039423 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await getCustomRepository(MovieRepository).save(
      await mockService.getMovieList(1)
    );
    await getCustomRepository(MovieRepository).save(
      await mockService.getMovieList(2)
    );
    await getCustomRepository(MovieRepository).save(
      await mockService.getMovieList(3)
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "movie"`);
  }
}
