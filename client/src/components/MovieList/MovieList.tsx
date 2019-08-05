import React from "react";
import "./MovieList.scss";
import MovieListItem from "../MovieListItem/MovieListItem";

interface IMovieListProps {
  movies: Array<{ 
    id: string, 
    title: string,
    releaseDate: Date,
    image: string,
    duration: string,
    genres: Array<string>,
    cast: Array<string>
  }>
}

const MovieList: React.FC<IMovieListProps> = ({ movies }) => {
  const movieListItems = movies.map((movie) => {
    return <MovieListItem key={movie.id} movie={movie}/>;
  });
  
  return (<div className='movie-list'>
    { movieListItems }
  </div>);
};
  
export default MovieList;
