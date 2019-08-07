import React from 'react';

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
                <span className="info-item">{movieSeriesData.rating}</span>
            </div>
        </header>
    );
}

export default MovieSeriesPageHeader;