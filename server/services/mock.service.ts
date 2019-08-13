import { Movie } from "../models/MovieModel";
import fetch from "node-fetch";

function api(url: string): Promise<any> {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const getMovieList = async (pageNum: number = 1): Promise<Movie[]> => {
  return await api(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOCK_API_KEY}&language=en-US&page=${pageNum}`
  )
    .then(async movies => {
      let newMovies = [];
      const startForeach = async () => {
        await asyncForEach(movies.results, async element => {
          let movieDetails = await api(
            `https://api.themoviedb.org/3/movie/${element.id}?api_key=${process.env.MOCK_API_KEY}&language=en-US`
          );
          let newMovie = new Movie();
          newMovie.title = element.title;
          newMovie.year = Number(element.release_date.split("-")[0]);
          newMovie.duration = movieDetails.runtime ? movieDetails.runtime : 0;
          newMovie.preview = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${element.backdrop_path}`;
          newMovie.description = element.overview;
          newMovies.push(newMovie);
        });
        return newMovies;
      };
      return startForeach();
    })
    .catch(error => {
      console.log(error.message);
      return error;
    });
};
