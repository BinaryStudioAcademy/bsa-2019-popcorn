import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar, faEdit } from '@fortawesome/free-solid-svg-icons';
import RateMovie from '../shared/RateMovie/RateMovie';
import ReviewAddModal from '../MovieSeriesPage/MovieSeriesReviews/ReviewAddModal/ReviewAddModal';
import TMovie from '../MovieSeriesPage/TMovie';

interface IProps {
	movie: TMovie;
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
	movie,
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

	const onModalClick = () => {
		setModal(true);
		fetchReview(userId, movieId);
	};

	const renderWatchIcon = () => {
		const { status, id: watchId } = watchListStatus;
		if (watchListLoading) {
			return <div className={`watch-list-icon loading-now`} />;
		}
		if (status === 'to_watch') {
			return (
				<div
					className={`watch-list-icon to-watch`}
					onClick={() => deleteMovieFromWatchList(watchId, movieId)}
					title="Click to remove from watch list"
				/>
			);
		}
		return status === 'watched' ? (
			<div
				className={`watch-list-icon watched`}
				title="You have already watched this movie"
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
					movie={movie}
					setReview={setReview}
					userId={userId}
					movieId={movieId}
					removeReviewSet={removeReviewSet}
				/>
			)}
			<div className="header-movie-title-rating">
				<div className="header-movie-watch-list">{renderWatchIcon()}</div>
				<div className="header-main-info">
					<span className="movie-title">{movie.title}</span>
					<span className="movie-year">
						{movie.release_date
							? ' (' + movie.release_date.slice(0, 4) + ')'
							: null}
					</span>
					<div className="header-genres-review-own-rating">
						<span className="header-genres">{movie.genres}</span>
					</div>
				</div>
				<div className="movie-rating-container">
					<div
						className="totaly-movie-rating"
						title={
							Number(movie.vote_average)
								? `Average Rating: ${movie.vote_average}`
								: 'No one has rated yet'
						}
					>
						<FontAwesomeIcon
							className="icon-star"
							icon={Number(movie.vote_average) ? solidStar : regularStar}
						/>
						{Number(movie.vote_average) || 0}
						<span className="max-rating">/10</span>
					</div>
					<RateMovie movieId={movie.id} />
					<div />
					<div className="header-review-own-rating-container">
						<div className="review-button" onClick={onModalClick}>
						<FontAwesomeIcon
							icon={faEdit}
						/>
							Write Review
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default MovieSeriesPageHeader;
