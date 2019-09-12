import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { MovieRate } from "../entities/MovieRate";

@EntityRepository(MovieRate)
class MovieRateRepository extends Repository<MovieRate> {
  async getRateByMovieId(
    movieId: string
  ): Promise<MovieRate & { average: any }> {
    return await getCustomRepository(MovieRateRepository)
      .createQueryBuilder("movieRate")
      .select("AVG(movieRate.rate)", "average")
      .where("movieRate.movieId = :id", { id: movieId })
      .getRawOne();
  }
  async getStatisticsByMovieId(movieId: string): Promise<MovieRate[]> {
    return await getCustomRepository(MovieRateRepository)
      .createQueryBuilder("movie_rate")
      .select("movie_rate.rate AS rate")
      .addSelect("COUNT(*) AS users")
      .groupBy("movie_rate.rate")
      .where({ movieId })
      .orderBy("rate", "ASC")
      .getRawMany();
  }
  async getRatesByMoviesId(moviesId: string[]): Promise<MovieRate[]> {
    return await getCustomRepository(MovieRateRepository)
      .createQueryBuilder("movieRate")
      .select("TRUNC(AVG(movieRate.rate),2)", "average")
      .addSelect("movieRate.movieId as movieId")
      .addSelect("COUNT(movieRate.movieId)", "count")
      .where("movieRate.movieId IN(:...moviesId)", { moviesId })
      .groupBy("movieRate.movieId")
      .getRawMany();
  }
  async getAverageStatisticsByMovieId(movieId: string): Promise<MovieRate[]> {
    return await getCustomRepository(MovieRateRepository)
      .createQueryBuilder("movieRate")
      .select("TRUNC(AVG(movieRate.rate),2)", "average")
      .addSelect("COUNT(movieRate.rate)", "count")
      .leftJoin("movieRate.user", "user")
      .addSelect("user.male")
      .where("movieRate.movieId = :id", { id: movieId })
      .groupBy("user.male")
      .getRawMany();
  }
}

export default MovieRateRepository;
