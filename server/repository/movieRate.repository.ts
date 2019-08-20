import { EntityRepository, Repository } from "typeorm";
import { MovieRate } from "../entities/MovieRate/MovieRate";

@EntityRepository(MovieRate)
class MovieRateRepository extends Repository<MovieRate> {}

export default MovieRateRepository;
