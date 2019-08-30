import { EntityRepository, Repository } from "typeorm";
import { MovieList } from "../entities/MovieList";

@EntityRepository(MovieList)
class MovieListRepository extends Repository<MovieList> {}

export default MovieListRepository;
