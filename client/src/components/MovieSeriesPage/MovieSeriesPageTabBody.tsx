import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MovieSeriesBasic from '../MovieSeriesBasic/MovieSeriesBasic';
import MovieSeriesCastCrew from '../MovieSeriesCastCrew/MovieSeriesCastCrew';
import MovieSeriesReviews from '../MovieSeriesReviews/MovieSeriesReviews';
import MovieSeriesPosts from '../MovieSeriesPosts/MovieSeriesPosts';
import MovieSeriesAwards from '../MovieSeriesAwards/MovieSeriesAwards';
import MovieSeriesStatistics from '../MovieSeriesStatistics/MovieSeriesStatistics';

interface IProps {
    mainPath: string
}

const MovieSeriesPageTabBody: React.SFC<IProps> = ({ mainPath }) => {
    return (
        <div className="movie-series-page-tab-body">
            <Switch>
                <Route exact path={`${mainPath}`} component={MovieSeriesBasic} />
                <Route path={`${mainPath}/cast-crew`} component={MovieSeriesCastCrew} />
                <Route path={`${mainPath}/reviews`} component={MovieSeriesReviews} />
                <Route path={`${mainPath}/posts`} component={MovieSeriesPosts} />
                <Route path={`${mainPath}/awards`} component={MovieSeriesAwards} />
                <Route path={`${mainPath}/statistics`} component={MovieSeriesStatistics} />
            </Switch>
        </div>
    );
}

export default MovieSeriesPageTabBody;