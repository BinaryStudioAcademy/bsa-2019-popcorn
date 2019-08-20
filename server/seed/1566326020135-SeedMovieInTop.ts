import { getCustomRepository, MigrationInterface, QueryRunner } from "typeorm";
import UserRepository from "../repository/user.repository";
import * as topService from "../services/top.service";
import * as movieService from "../services/movie.service";
import { MovieInTop } from "../models/MovieInTopModel";
import MovieInTopRepository from '../repository/movieInTop.repository';

export class SeedMovieInTop1566326020135 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        setTimeout(async () => {
            const user = await getCustomRepository(UserRepository).getByEmail(
                "test@gmail.com"
            );

            const tops = await topService.getTopsByUserId(user.id);

            const moviesSeed: any[] = await movieService.getMovies({ size: 0, from: 5 });
            console.log(moviesSeed.length);
            const movieInTopSeed = [];
            
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                   movieInTopSeed.push({
                        comment: 'Nice',
                        topId: tops[i].id,
                        movieId: moviesSeed[j].id
                   });
                }
            }

            console.log(movieInTopSeed);
            
            movieInTopSeed.map(async movieInTopData => {
                const movieInTop = new MovieInTop();
                movieInTop.comment = movieInTopData.comment;
                movieInTop.topId = movieInTopData.topId;
                movieInTop.movieId = movieInTopData.movieId;

                await getCustomRepository(MovieInTopRepository).save(movieInTop);
            });
        }, 1000);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}