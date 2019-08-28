import React, { useState, ObjectHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../shared/StarRating/StarRating';
import { IUserRate } from './MovieSeriesPage';
import Spinner from '../shared/Spinner';
import ReviewAddModal from '../MovieSeriesPage/MovieSeriesReviews/ReviewAddModal/ReviewAddModal';
import TMovie from '../MovieSeriesPage/TMovie';

interface IProps {
	movie: TMovie;
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
}

const MovieSeriesPageHeader: React.FC<IProps> = ({
	movie,
	userRate,
	setUserRate,
	ownReview,
	fetchReview,
	userId,
	movieId,
	setReview,
	removeReviewSet
}) => {
	const [modal, setModal] = useState(false);
	const rate: number = userRate ? +userRate.rate : 0;

	const onModalClick = () => {
		setModal(true);
		fetchReview(userId, movieId);
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
			<div className="movie-title-rating">
				<div className="title">
					{movie.title}
					{movie.release_date
						? '(' + movie.release_date.slice(0, 4) + ')'
						: null}
				</div>
				<div className="review-button" onClick={() => onModalClick()}>
					review
				</div>
				<StarRating
					size={5}
					default={rate}
					setUserRate={setUserRate}
					userRate={userRate}
				/>
				<span className="rating">
					<FontAwesomeIcon className="icon-star" icon={faStar} />
					{Number(movie.vote_average) || 0}
					<span className="max-rating">/5</span>
				</span>
			</div>
			<div className="info">
				<span className="info-item">{movie.genres}</span>
			</div>
		</header>
	);
};

export default MovieSeriesPageHeader;
