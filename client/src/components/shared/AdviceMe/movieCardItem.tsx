import React, { useState } from 'react';
import './movieCardItem.scss';
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
import { IUserRate } from '../../MovieSeriesPage/MovieSeriesPage';
import Spinner from '../Spinner';
import {
	fetchReviewByMovieUserId,
	fetchUserRate,
	removeReviewSet,
	setReview,
	setUserRate
} from '../../MovieSeriesPage/Movie.redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

interface IState {
	showFullReview: boolean;
	textBlockHeight: string;
	isBigBlock: boolean;
}

// let rendered = false;
// const render = (divRef, setText, text) => {
//     if(rendered){
//         return;
//     }
//     const styles = getComputedStyle(divRef.current);
//     const height = parseInt(styles.height as string);
//     if (height > 90) {
//         setText({
//             ...text,
//             textBlockHeight: `not-auto`,
//             isBigBlock: true
//         });
//     }
//     rendered = true;
// };

const MovieCardItem: React.FC<IMovieListItemProps> = props => {
	const [text, setText] = useState<IState>({
		showFullReview: false,
		textBlockHeight: 'auto',
		isBigBlock: false
	});

	const { movie } = props;
	const duration = getFilmDuration(movie.runtime);

	const divRef = React.createRef();

	// render(divRef, setText, text);

	if (!props.userRate) {
		props.fetchUserRate(props.profileInfo.id, movie.id);
		return <Spinner />;
	}

	const handleClickShowMore = () => {
		setText({
			...text,
			showFullReview: !text.showFullReview,
			textBlockHeight: text.showFullReview ? 'not-auto' : 'auto'
		});
	};

	const { showFullReview, textBlockHeight, isBigBlock } = text;
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
				<div className="description">
					<div
						ref={divRef as any}
						className={`review-item-text ${
							isBigBlock ? 'review-item-text-big' : null
						} ${showFullReview ? 'review-item-text-big-show-full' : null}`}
					>
						{movie.overview}
						{textBlockHeight !== 'auto' && !showFullReview ? (
							<div
								className="read-more-gradient"
								onClick={() => handleClickShowMore()}
							/>
						) : null}
					</div>
				</div>
				<div>
					<div className="movie-cast">
						<b>Main cast:</b> {movie.mainCast}
					</div>
					<div className={'videoWrapper'}>
						<iframe
							className="video"
							src={movie.video}
							title={movie.video}
							frameBorder={0}
						/>
					</div>
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
