import React from 'react';
import Ratings from 'react-ratings-declarative';

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
                <div className="original-title">
                    Original title: <span>{movieSeriesData.title}</span>
                </div>
                <div className="release-year">
                    Release year: <span>{movieSeriesData.releaseYear}</span>
                </div>
                <div className="genre">
                    Genre: <span>{movieSeriesData.genre.join(', ')}</span>
                </div>
                <div className="rating">
                    Rating: <Ratings
                        rating={movieSeriesData.rating}
                        changeRating={(rating: number) => console.log(rating)}
                        widgetRatedColors="blue"
                        widgetHoverColors="orange"
                        widgetDimensions="20px"
                        widgetSpacings="0"
                    >
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                        <Ratings.Widget />
                    </Ratings>
                </div>
            </div>
        </header>
    );
}

export default MovieSeriesPageHeader;