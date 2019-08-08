import {getCustomRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Movie } from "../models/MovieModel";
import MovieRepository from "../repository/movie.repository";
const uuid = require('uuid/v4');

export class SeedMovies1565181039423 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
		const movie = new Movie();
		movie.title = "Snatch";
		movie.year = 2000;
		movie.duration = 102;
		movie.preview = "https://cdn.fishki.net/upload/post/2018/07/06/2643538/tn/e5b5a9b5799b32bf207a0e6e30850ad2.jpg";
		movie.description = "Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.";
		
		const movie2 = new Movie();
		movie2.title = "The Big Lebowski";
		movie2.year = 1998;
		movie2.duration = 117;
		movie2.preview = "https://www.festival-entrevues.com/sites/default/files/styles/large/public/images/films/2018/john_goodman_big_lebowski_oui.jpg?itok=79fG-sbO";
		movie2.description = 'Jeff "The Dude" Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.';
		
		const movie3 = new Movie();
		movie3.title = "Big";
		movie3.year = 1988;
		movie3.duration = 104;
		movie3.preview = "https://m.media-amazon.com/images/M/MV5BODk3MDcxMTg1Ml5BMl5BanBnXkFtZTcwNTQ0ODU4NA@@._V1_.jpg";
		movie3.description = 'After wishing to be made big, a teenage boy wakes the next morning to find himself mysteriously in the body of an adult.';
		
		await getCustomRepository(MovieRepository)
            .save([movie, movie2, movie3]);
	}

    public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`DROP TABLE "movie"`); // reverts things made in "up" method
    }

}
