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
import TMovie from './TMovie';
import { IDiscussionUser } from '../UserPage/UserEvents/UserEvents.service';

const messages = [
	{
		id: '1',
		name: 'Ammaar Montees',
		text:
			'A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.',
		avatar: 'https://i.pravatar.cc/300?img=14',
		createdAt: '10 days ago'
	},
	{
		id: '2',
		name: 'Wil Pope',
		text:
			'Titanic was massive on every level, including the casting process. From Matthew McConaughey to Angelina Jolie, dozens of A-listers were considered. Who almost played Jack and Rose?',
		avatar: 'https://i.pravatar.cc/300?img=24',
		createdAt: '1 day ago'
	},
	{
		id: '3',
		name: 'Forrest Meadows',
		text: 'I am going to watch it',
		avatar: 'https://i.pravatar.cc/300?img=10',
		createdAt: '2 hours ago'
	},
	{
		id: '4',
		name: 'Forrest Meadows',
		text: 'I am going to watch it',
		avatar: 'https://i.pravatar.cc/300?img=10',
		createdAt: '2 hours ago'
	},
	{
		id: '5',
		name: 'Forrest Meadows',
		text: 'I am going to watch it',
		avatar: 'https://i.pravatar.cc/300?img=10',
		createdAt: '2 hours ago'
	},
	{
		id: '6',
		name: 'Forrest Meadows',
		text: 'I am going to watch it',
		avatar: 'https://i.pravatar.cc/300?img=10',
		createdAt: '2 hours ago'
	}
];

interface IProps {
	mainPath: string;
	movie: TMovie;
	currentUser: IDiscussionUser;
}

const MovieSeriesPageTabBody: React.SFC<IProps> = ({
	mainPath,
	movie,
	currentUser
}) => {
	return (
		<div className={'movie-series-page-tab-body'}>
			<Switch>
				<Route
					exact
					path={`${mainPath}`}
					render={() => <FilmBasicTabComponent movie={movie} />}
				/>
				<Route
					path={`${mainPath}/cast-crew`}
					render={() => <StaffCast movie={movie} />}
				/>
				<Route path={`${mainPath}/reviews`} component={MovieSeriesReviews} />
				<Route path={`${mainPath}/posts`} component={MovieSeriesPosts} />
				<Route path={`${mainPath}/awards`} component={MovieSeriesAwards} />
				<Route
					path={`${mainPath}/statistics`}
					component={MovieSeriesStatistics}
				/>
			</Switch>
			<DiscussionComponent
				entityId={movie.id}
				messages={movie.messages}
				currentUser={currentUser}
				entityIdName="movieId"
			/>
		</div>
	);
};

export default MovieSeriesPageTabBody;
