import React, { useState, ObjectHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../shared/StarRating/StarRating';
import { IUserRate } from './MovieSeriesPage';
import Spinner from '../shared/Spinner';
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
	removeReviewSet
}) => {
	const [modal, setModal] = useState(false);
	const genre = movieSeriesData.genre && movieSeriesData.genre.join(', ');
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
					movie={movieSeriesData}
					setReview={setReview}
					userId={userId}
					movieId={movieId}
					removeReviewSet={removeReviewSet}
				/>
			)}
			<div className="movie-title-rating">
				<div className="title">
					{movieSeriesData.title}
					{movieSeriesData.release_date
						? '(' + movieSeriesData.release_date.slice(0, 4) + ')'
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
					{Number(movieSeriesData.vote_average) || 0}
					<span className="max-rating">/5</span>
				</span>
			</div>
			<div className="info">
				<span className="info-item">Action, Drama, Horror</span>
			</div>
		</header>
	);
};

export default MovieSeriesPageHeader;
