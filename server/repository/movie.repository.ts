import { EntityRepository, Repository } from "typeorm";
import { Movie } from "../entities/Movie";
import fetch from "node-fetch";

export const getCredits = async (movieId: any) =>
  await fetch(
    `http://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOCK_API_KEY}&append_to_response=credits`
  ).then(res => res.json());

export const getMovieVideoLinkById = async (movieId: number) =>
  await fetch(
    `http://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.MOCK_API_KEY}`
  )
    .then(res => res.json())
    .then(data => (data.results[0] ? data.results[0].key : ""));

@EntityRepository(Movie)
class MovieRepository extends Repository<Movie> {}

export default MovieRepository;
