import React from 'react';
import MovieSeriesPageHeader from './MovieSeriesPageHeader';
import MovieSeriesPageTabs from './MovieSeriesPageTabs';
import MovieSeriesPageTabBody from './MovieSeriesPageTabBody';
import './MovieSeriesPage.scss';

interface IProps {
    match: {
        path: string
    }
}

const movieSeriesData = {
    title: 'Confessions of a Teenage Drama Queen',
    releaseYear: 2004,
    genre: ['Comedy', 'Family', 'Music'],
    rating: 3.5
};

const MovieSeriesPage: React.SFC<IProps> = ({ match }) => {
    const { path: mainPath } = match;

    return (
        <div className="movie-series-page">
            <MovieSeriesPageHeader movieSeriesData={movieSeriesData} />       
            <MovieSeriesPageTabs mainPath={mainPath} />
            <MovieSeriesPageTabBody mainPath={mainPath} />
        </div>
    );
}

export default MovieSeriesPage;