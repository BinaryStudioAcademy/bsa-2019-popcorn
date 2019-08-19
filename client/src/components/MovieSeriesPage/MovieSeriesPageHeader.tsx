import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	movieSeriesData: {
		title: string;
		release_date?: string;
		genre?: string[];
		vote_average?: string;
		any?;
	};
}

const defaultRating = 0;
const MovieSeriesPageHeader: React.FC<IProps> = ({ movieSeriesData }) => {
	const genre = movieSeriesData.genre && movieSeriesData.genre.join(', ');
	return (
		<header className="movie-series-page-header">
			<div className="movie-title-rating">
				<div className="title">
					{movieSeriesData.title}
					{movieSeriesData.release_date
						? '(' + movieSeriesData.release_date.slice(0, 4) + ')'
						: null}
				</div>
				<span className="rating">
					<FontAwesomeIcon className="icon-star" icon={faStar} />
					{movieSeriesData.vote_average || defaultRating}
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
