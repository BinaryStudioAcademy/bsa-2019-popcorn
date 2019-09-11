import { EntityRepository, Repository } from "typeorm";
import { MovieInTop } from "../entities/MovieInTop";

@EntityRepository(MovieInTop)
class MovieInTopRepository extends Repository<MovieInTop> {
    deleteMoviesByTopId = (topId: string) =>
        this.createQueryBuilder("movieInTop")
            .delete()
            .where(`topId='${topId}'`)
            .execute();
}

export default MovieInTopRepository;
