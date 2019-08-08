import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DiscussionComponent from '../DiscussionComponent/DiscussionComponent';
import FilmBasicTabComponent from '../FilmBasicTabComponent/FilmBasicTabComponent';
import MovieSeriesCastCrew from '../MovieSeriesCastCrew/MovieSeriesCastCrew';
import MovieSeriesReviews from '../MovieSeriesReviews/MovieSeriesReviews';
import MovieSeriesPosts from '../MovieSeriesPosts/MovieSeriesPosts';
import MovieSeriesAwards from '../MovieSeriesAwards/MovieSeriesAwards';
import MovieSeriesStatistics from '../MovieSeriesStatistics/MovieSeriesStatistics';
import StaffCast from '../StaffCast/StaffCast';

const messages =
        [{
            id: '1',
            name: 'Morris',
            body: 'Nice to see you',
            photo: 'https://img.icons8.com/dusk/64/000000/circled-user-male-skin-type-6.png',
            date: '08.12.2017 12:35'
        }];

interface IProps {
    mainPath: string
}

const MovieSeriesPageTabBody: React.SFC<IProps> = ({ mainPath }) => {
    return (
        <div className="movie-series-page-tab-body">
            <Switch>
                <Route exact path={`${mainPath}`} component={FilmBasicTabComponent} />
                <Route path={`${mainPath}/cast-crew`} component={StaffCast} />
                <Route path={`${mainPath}/reviews`} component={MovieSeriesReviews} />
                <Route path={`${mainPath}/posts`} component={MovieSeriesPosts} />
                <Route path={`${mainPath}/awards`} component={MovieSeriesAwards} />
                <Route path={`${mainPath}/statistics`} component={MovieSeriesStatistics} />
            </Switch>
            <DiscussionComponent messages={messages}/>
        </div>
    );
}

export default MovieSeriesPageTabBody;