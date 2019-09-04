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
        imageUrl: "//i.imgur.com/QZVrUe6.png",
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
      },
      {
        title: "Bizarre Movies",
        description:
          "The most bizarre movies I've seen in my life. Some are very good but others just terrible............",
        isPrivate: true,
        imageUrl: "//i.imgur.com/4inhL7m.png",
        moviesId: ["348", "6479", "7131", "578", "539", "329", "333", "3035"]
      },
      {
        title: "10 Must-See Films",
        description:
          "An assorted collection of good films of varying genres, a few classics and blockbusters, as well as some underrated gems.",
        isPrivate: false,
        imageUrl: "//i.imgur.com/FbMATAm.png",
        moviesId: [
          "257",
          "253",
          "507",
          "508",
          "503",
          "506",
          "501",
          "494",
          "390",
          "396"
        ]
      },
      {
        title: "Top Modern Movies",
        description:
          "These are some of my top movies from the 21st century. They are in no order and may be subject to change as more movies come out and blow my mind.",
        isPrivate: false,
        imageUrl: "//i.imgur.com/l8lyaNC.png",
        moviesId: ["257", "253", "507", "508", "297"]
      }
    ];

    for (const list of movieListsArray) {
      await getCustomRepository(MovieListRepository).save({
        user: { id: admin.id },
        title: list.title,
        description: list.description,
        isPrivate: list.isPrivate,
        moviesId: list.moviesId,
        imageUrl: list.imageUrl
      });
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
