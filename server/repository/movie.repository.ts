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

export const getAwards = async id =>
  await fetch(
    `https://www.myapifilms.com/imdb/idIMDB?idIMDB=${id}&token=cabc05cf-742d-4549-8b35-a0aeddd1a49e&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=1&technical=0&trailers=0&movieTrivia=0&awards=1&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&goofs=0&keyword=0&quotes=0&fullSize=0&companyCredits=0&filmingLocations=0&directors=1&writers=1`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "5380fc9975msh6b855d860b5c45dp1fef88jsn3d02c7bca79e"
      }
    }
  ).then(res => res.json());

@EntityRepository(Movie)
class MovieRepository extends Repository<Movie> {}

export default MovieRepository;
