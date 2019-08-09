import React from "react";
import "./MovieList.scss";
import MovieListItem from "./MovieListItem/MovieListItem";

interface IMovieListProps {
  movies : null | Array<{
    id: string,
    title: string,
    year?: number,
    image: string,
    duration: string,
    genres: Array<string>,
    cast: Array<string>
  }>
}

const MovieList: React.FC<IMovieListProps> = ({ movies }) => {
  if(!movies)
    return <div>Any movie in list</div>
  const movieListItems = movies.map((movie) => {
    return <MovieListItem key={movie.id} movie={movie}/>;
  });
  
  return (
    <div className='movie-list'>
      { movieListItems }
    </div>
  );
};
  
export default MovieList;
