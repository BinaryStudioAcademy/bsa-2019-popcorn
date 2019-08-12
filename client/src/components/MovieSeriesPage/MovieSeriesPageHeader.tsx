import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	movieSeriesData: {
		title: string;
		year?: number;
		genre?: string[];
		rating?: number;
		any?;
	};
}

const defaultRating = 3.5;
const MovieSeriesPageHeader: React.FC<IProps> = ({ movieSeriesData }) => {
	const genre = movieSeriesData.genre && movieSeriesData.genre.join(', ');
	return (
		<header className="movie-series-page-header">
			<div className="title">{movieSeriesData.title}</div>
			<div className="info">
				<span className="info-item">{movieSeriesData.year}</span>
				<span className="info-item">{genre}</span>
				<span className="info-item">
					<FontAwesomeIcon className="icon-star" icon={faStar} />
					{movieSeriesData.rating || defaultRating}
				</span>
			</div>
		</header>
	);
};

export default MovieSeriesPageHeader;
