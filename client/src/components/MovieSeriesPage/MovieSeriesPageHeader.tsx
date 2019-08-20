import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import StarRating from '../shared/StarRating/StarRating';
import { IUserRate } from './MovieSeriesPage';

interface IProps {
	movieSeriesData: {
		title: string;
		release_date?: string;
		genre?: string[];
		vote_average?: string;
	};
	userRate?: IUserRate;
	setUserRate: (userRate: object) => any;
}

const MovieSeriesPageHeader: React.FC<IProps> = ({
	movieSeriesData,
	userRate,
	setUserRate
}) => {
	const genre = movieSeriesData.genre && movieSeriesData.genre.join(', ');
	const rate: number = userRate ? +userRate.rate : 0;
	return (
		<header className="movie-series-page-header">
			<div className="movie-title-rating">
				<div className="title">
					{movieSeriesData.title}
					{movieSeriesData.release_date
						? '(' + movieSeriesData.release_date.slice(0, 4) + ')'
						: null}
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
