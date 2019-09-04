import { MigrationInterface, QueryRunner, getCustomRepository } from "typeorm";
import MovieListRepository from "../repository/movieList.repository";
import UserRepository from "../repository/user.repository";
import { MovieList } from "../models/MovieListModel";

export class SeedMovieList1567632579430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const admin = await getCustomRepository(UserRepository).findOne({
      where: { name: "admin" }
    });

    const movieListsArray = [
      {
        title: "Worst Movies Ever According to Wikipedia",
        description:
          "The films listed below have been cited by a variety of notable critics in varying media sources as being among the worst films ever made. Films on this list are generally feature-length films that are commercial in nature (intended to turn a profit), professional produced (as opposed to amateur productions), and released in theaters, then on television, or more recently through on-demand streaming services.",
        isPrivate: false,
        moviesId: [
          "297",
          "302",
          "306",
          "307",
          "329",
          "333",
          "345",
          "468",
          "501",
          "280",
          "350",
          "339",
          "346",
          "471",
          "508"
        ]
      }
    ];

    console.log(admin);

    for (const list of movieListsArray) {
      await getCustomRepository(MovieListRepository).save({
        user: { id: admin.id },
        title: list.title,
        description: list.description,
        isPrivate: list.isPrivate,
        moviesId: list.moviesId
      });
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
