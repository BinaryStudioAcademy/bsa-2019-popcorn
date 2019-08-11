import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DiscussionComponent from './DiscussionComponent/DiscussionComponent';
import FilmBasicTabComponent from './FilmBasicTabComponent/FilmBasicTabComponent';
import MovieSeriesCastCrew from './MovieSeriesCastCrew/MovieSeriesCastCrew';
import MovieSeriesReviews from './MovieSeriesReviews/MovieSeriesReviews';
import MovieSeriesPosts from './MovieSeriesPosts/MovieSeriesPosts';
import MovieSeriesAwards from './MovieSeriesAwards/MovieSeriesAwards';
import MovieSeriesStatistics from './MovieSeriesStatistics/MovieSeriesStatistics';
import StaffCast from './StaffCast/StaffCast';

const messages = [
    {
        id: '1',
        name: 'Ammaar Montees',
        body: 'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.',
        photo: 'https://i.pravatar.cc/300?img=14',
        date: '10 days ago'
    },
    {
        id: '2',
        name: 'Wil Pope',
        body: 'Titanic was massive on every level, including the casting process. From Matthew McConaughey to Angelina Jolie, dozens of A-listers were considered. Who almost played Jack and Rose?',
        photo: 'https://i.pravatar.cc/300?img=24',
        date: '1 day ago'
    },
    {
        id: '3',
        name: 'Forrest Meadows',
        body: 'I am going to watch it',
        photo: 'https://i.pravatar.cc/300?img=10',
        date: '2 hours ago'
    }
];

interface IProps {
    mainPath: string
}

const MovieSeriesPageTabBody: React.SFC<IProps> = ({ mainPath }) => {
    return (
        <div className={"movie-series-page-tab-body"}>
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
};

export default MovieSeriesPageTabBody;