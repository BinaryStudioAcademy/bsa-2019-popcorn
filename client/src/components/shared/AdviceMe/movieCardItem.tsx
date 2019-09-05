import React from 'react';
import './movieCardItem.scss';
import { ReactComponent as DurationIcon } from '../../../assets/icons/general/movie/duration-icon.svg';
import config from '../../../config';
import Image from '../../shared/Image/Image';
import TMovie from '../../MovieSeriesPage/TMovie';
import getFilmDuration from '../../../helpers/getFilmDuration';
import MovieSeriesPageHeader from '../../MovieSeriesPage/MovieSeriesPageHeader';
import {
	addMovieToWatchList,
	deleteMovieFromWatchList,
	fetchWatchListStatus
} from '../../UserPage/UserWatchList/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IUserRate } from '../../MovieSeriesPage/MovieSeriesPage';
import Spinner from '../Spinner';
import {
	fetchReviewByMovieUserId,
	fetchUserRate,
	removeReviewSet,
	setReview,
	setUserRate
} from '../../MovieSeriesPage/Movie.redux/actions';

interface IMovieListItemProps {
	movie: TMovie;
	key: string;
	setMovieSeries?: (movie: any) => any;
	saveMovie?: (movie: TMovie) => any;
	fetchedMovie: any;
	userRate: IUserRate;
	setUserRate: (userRate: any) => object;
	fetchUserRate: (userId: string, movieId: string) => object;
	fetchMovie: (movieId: string) => object;
	fetchReview: (userId: string, movieId: string) => object;
	setReview: (
		userId: string,
		movieId: string,
		text: string,
		prevId?: string
	) => object;
	removeReviewSet: () => object;
	ownReview: any;
	match: any;
	avatar?: string;
	userId: string;
	username: string;
	fetchWatchListStatus: (movieId: string) => object;
	watchListStatus?: any;
	addMovieToWatchList: (movieId: string) => object;
	deleteMovieFromWatchList: (watchId: string, movieId: string) => object;
	watchListLoading?: boolean;
	profileInfo: any;
}

const MovieCardItem: React.FC<IMovieListItemProps> = props => {
	const { movie } = props;
	const duration = getFilmDuration(movie.runtime);

	if (!props.userRate) {
		props.fetchUserRate(props.profileInfo.id, movie.id);
		return <Spinner />;
	}
	return (
		<div
			className={'movie-card-item'}
			onClick={() => {
				if (props.saveMovie) {
					props.saveMovie(movie);
				}
			}}
		>
			<MovieSeriesPageHeader
				movie={movie}
				userRate={props.userRate}
				setUserRate={rateObj => props.setUserRate(rateObj)}
				ownReview={props.ownReview}
				fetchReview={props.fetchReview}
				userId={props.profileInfo.userId}
				movieId={movie.id}
				setReview={props.setReview}
				removeReviewSet={props.removeReviewSet}
				watchListStatus={props.watchListStatus}
				addMovieToWatchList={props.addMovieToWatchList}
				deleteMovieFromWatchList={deleteMovieFromWatchList}
				watchListLoading={props.watchListLoading}
			/>
			<div className={'movie-poster-wrp'}>
				<Image
					src={movie.poster_path}
					defaultSrc={config.DEFAULT_MOVIE_IMAGE}
					alt="movie-poster"
					className="movie-poster"
				/>
			</div>
			<div className="movie-info">
				<div>
					<span className="movie-genre">{movie.genres}</span>
					{duration && (
						<span className="movie-duration">
							<DurationIcon />
							{duration}
						</span>
					)}
				</div>
				<div className="movie-cast">
					<b>Main cast:</b> {movie.mainCast}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	userRate: rootState.movie.userRate,
	fetchedMovie: rootState.movie.fetchedMovie,
	avatar: rootState.profile.profileInfo && rootState.profile.profileInfo.avatar,
	userId: rootState.profile.profileInfo && rootState.profile.profileInfo.id,
	username: rootState.profile.profileInfo && rootState.profile.profileInfo.name,
	ownReview: rootState.movie.ownReview,
	watchListStatus: rootState.watchList.watchListStatus,
	watchListLoading: rootState.watchList.isLoading,
	awards: rootState.movie.awards,
	statistics: rootState.movie.statistics,
	profileInfo: rootState.profile.profileInfo
});

const mapDispatchToProps = dispatch => {
	const actions = {
		fetchUserRate,
		setUserRate,
		fetchReview: fetchReviewByMovieUserId,
		setReview,
		removeReviewSet,
		fetchWatchListStatus,
		addMovieToWatchList,
		deleteMovieFromWatchList
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieCardItem);
