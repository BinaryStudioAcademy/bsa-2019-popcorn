import React from "react";

interface IMovieListItemProps {
  movie: { 
    id: string, 
    title: string,
    year: number,
    image: string,
    duration: string,
    cast: Array<string>
  },
  key: string
}

const MovieListItem: React.FC<IMovieListItemProps> = ({ movie }) => {
  return (<div>
    { movie.title }
  </div>);
};
  
export default MovieListItem;
