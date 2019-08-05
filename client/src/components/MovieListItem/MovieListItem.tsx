import React from "react";
import "./MovieListItem.scss";
import { ReactComponent as GenreIcon } from './genre-icon.svg';
import { ReactComponent as DurationIcon } from './duration-icon.svg';

interface IMovieListItemProps {
  movie: { 
    id: string, 
    title: string,
    releaseDate: Date,
    image: string,
    duration: string,
    genres: Array<string>,
    cast: Array<string>
  },
  key: string
}

const MovieListItem: React.FC<IMovieListItemProps> = ({ movie }) => {
  return (
    <div className='movie-item'>
      <div className='movie-poster-wrp'>
        <img className='movie-poster' alt='movie-poster' src={movie.image}/>
      </div>
      <div className='movie-info'>
        <div className='movie-title'>{movie.title} ({movie.releaseDate.getFullYear()})</div>
        <div> 
          <span className='movie-genre'><GenreIcon/>{movie.genres.slice(0,3).join(', ')}</span>
          <span className='movie-duration'><DurationIcon/>{movie.duration}</span>
        </div>
        <div className='movie-cast'><b>Main cast:</b> {movie.cast.join(', ')}</div>
      </div>
    </div>
  );
};
  
export default MovieListItem;
