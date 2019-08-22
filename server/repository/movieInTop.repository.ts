import { EntityRepository, Repository } from "typeorm";
import { MovieInTop } from "../entities/MovieInTop";

@EntityRepository(MovieInTop)
class MovieInTopRepository extends Repository<MovieInTop> {}

export default MovieInTopRepository;
