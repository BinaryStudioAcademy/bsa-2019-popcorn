import React from 'react';
import { IMovie } from './TopPage.service';

interface ITopProps {
    key: any;
    movie: IMovie;
}

const TopPageMovie: React.SFC<ITopProps> = ({
    key,
    movie
}) => {
    return (
        <div className="top-movie-list-item" key={key}>
            <img src={movie.poster_path} alt="movie-image" />
            <div className="movie-description">
                <div>
                    <span className="movie-title">{movie.title}</span>
                    <span className="movie-year">{` (${movie.release_date.slice(0, 4)})`}</span>
                </div>
                <div className="movie-genres">
                    {movie.genres}
                </div>
                <span className="author-comment">{movie.comment}</span>
            </div>
        </div>
    )
}

export default TopPageMovie;
