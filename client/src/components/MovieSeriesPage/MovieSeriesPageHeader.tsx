import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    movieSeriesData: {
        title: string,
        releaseYear: number,
        genre: string[],
        rating: number
    }
}

const MovieSeriesPageHeader: React.FC<IProps> = ({ movieSeriesData }) => {
    return (
        <header className="movie-series-page-header">
            <div className="title">{movieSeriesData.title}</div>
            <div className="info">
                <span className="info-item">{movieSeriesData.releaseYear}</span>
                <span className="info-item">{movieSeriesData.genre.join(', ')}</span> 
                <span className="info-item">
                    <FontAwesomeIcon className="icon-star" icon={faStar} />
                    {movieSeriesData.rating}
                </span>
            </div>
        </header>
    );
}

export default MovieSeriesPageHeader;