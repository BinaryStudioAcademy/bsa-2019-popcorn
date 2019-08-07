import {EntityRepository, Repository} from "typeorm";
import {Movie} from "../entities/Movie";

@EntityRepository(Movie)
class MovieRepository extends Repository<Movie> {
}


export default MovieRepository;