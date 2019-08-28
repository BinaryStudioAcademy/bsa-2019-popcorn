import React, { useState, ObjectHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../shared/StarRating/StarRating';
import { IUserRate } from './MovieSeriesPage';
import ReviewAddModal from '../MovieSeriesPage/MovieSeriesReviews/ReviewAddModal/ReviewAddModal';

interface IProps {
	movieSeriesData: {
		title: string;
		release_date?: string;
		genre?: string[];
		vote_average?: string;
	};
	userRate?: IUserRate;
	setUserRate: (userRate: object) => any;
	ownReview: any;
	fetchReview: (userId: string, movieID: string) => any;
	userId: string;
	movieId: string;
	setReview: (
		userId: string,
		movieID: string,
		text: string,
		prevId?: string
	) => any;
	removeReviewSet: () => object;
	watchListStatus: any;
	addMovieToWatchList: (movieId: string) => object;
	deleteMovieFromWatchList: (watchId: string, movieId: string) => object;
	watchListLoading?: boolean;
}

const MovieSeriesPageHeader: React.FC<IProps> = ({
	movieSeriesData,
	userRate,
	setUserRate,
	ownReview,
	fetchReview,
	userId,
	movieId,
	setReview,
	removeReviewSet,
	watchListStatus,
	addMovieToWatchList,
	deleteMovieFromWatchList,
	watchListLoading
}) => {
	const [modal, setModal] = useState(false);
	const genre = movieSeriesData.genre && movieSeriesData.genre.join(', ');
	const rate: number = userRate ? +userRate.rate : 0;

	const onModalClick = () => {
		setModal(true);
		fetchReview(userId, movieId);
	};

	const renderWatchIcon = () => {
		const { status, id: watchId } = watchListStatus;
		if (watchListLoading) {
			return <div className={`watch-list-icon loading-now`} />;
		}
		return status ? (
			<div
				className={`watch-list-icon movie-in-list`}
				onClick={() => deleteMovieFromWatchList(watchId, movieId)}
				title="in your watch list"
			/>
		) : (
			<div
				className={`watch-list-icon add-to-watch-list`}
				onClick={() => addMovieToWatchList(movieId)}
				title="add to watch list"
			/>
		);
	};

	return (
		<header className="movie-series-page-header">
			{modal && ownReview && (
				<ReviewAddModal
					ownReview={ownReview!}
					setModal={setModal}
					movie={movieSeriesData}
					setReview={setReview}
					userId={userId}
					movieId={movieId}
					removeReviewSet={removeReviewSet}
				/>
			)}
			<div className="header-movie-title-rating">
				<div className="header-movie-watch-list">{renderWatchIcon()}</div>
				<div className="header-main-info">
					<span className="movie-title">{movieSeriesData.title}</span>
					<span className="movie-year">
						{movieSeriesData.release_date
							? ' (' + movieSeriesData.release_date.slice(0, 4) + ')'
							: null}
					</span>
					<div className="header-genres">
						<span className="info-item">Action | Drama | Horror</span>
					</div>
				</div>
				<div className="totaly-movie-rating">
					<FontAwesomeIcon className="icon-star" icon={faStar} />
					{Number(movieSeriesData.vote_average) || 0}
					<span className="max-rating">/5</span>
				</div>

				{/* <div className="review-button" onClick={() => onModalClick()}>
					review
				</div>
				<StarRating
					size={5}
					default={rate}
					setUserRate={setUserRate}
					userRate={userRate}
				/> */}
			</div>
		</header>
	);
};

export default MovieSeriesPageHeader;
