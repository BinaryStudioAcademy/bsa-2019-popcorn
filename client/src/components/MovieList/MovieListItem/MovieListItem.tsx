import React from "react";
import "./MovieListItem.scss";
import { ReactComponent as GenreIcon } from '../../../assets/icons/general/movie/genre-icon.svg';
import { ReactComponent as DurationIcon } from '../../../assets/icons/general/movie/duration-icon.svg';
import { NavLink } from 'react-router-dom';

interface IMovieListItemProps {
  movie: { 
    id: string, 
    title: string,
    year?: number,
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
        <img className='movie-poster' alt='movie-poster' src={"https://st.kp.yandex.net/images/film_iphone/iphone360_841700.jpg"}/>
      </div>
      <div className='movie-info'>
        <NavLink to={"/movie-series"} className='movie-link'>
          <div className='movie-title'>{movie.title} {movie.year}</div>
        </NavLink>
        <div>
          {/*movie.genres.slice(0,3).join(', ')*/}
          <span className='movie-genre'><GenreIcon/>{"Action, Drama, Horror"}</span>
          <span className='movie-duration'><DurationIcon/>{movie.duration}</span>
        </div>
        {/*movie.cast.join(', ')*/}
        <div className='movie-cast'><b>Main cast:</b> {"Matt Damon, Jessica Chastain, Kristen Wiig"}</div>
      </div>
    </div>
  );
};
  
export default MovieListItem;
