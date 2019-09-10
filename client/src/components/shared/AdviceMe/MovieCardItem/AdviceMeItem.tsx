import React, { useState, ObjectHTMLAttributes } from 'react';
import './AdviceMeItem.scss';
import config from '../../../../config';
import Image from '../../Image/Image';
import TMovie from '../../../MovieSeriesPage/TMovie';
import WatchListIcon from '../../WatchListIcon/WatchListIcon';

interface IProps {
	movie: TMovie;
}

const MovieCardItem: React.FC<IProps> = ({ movie }) => {
	const {
		id: movieId,
		release_date,
		mainCast,
		video,
		poster_path,
		title
	} = movie;

	return (
		<div className="AdviceMeItem">
			<div className="advice-me-header">
				<WatchListIcon movieid={movieId} />
				<div className="header-center">
					<div className="advice-me-title">
						{title}
						<span className="advice-me-year"></span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieCardItem;
