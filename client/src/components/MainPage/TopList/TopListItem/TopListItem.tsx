import React from 'react';
import { ReactComponent as StaredIcon } from '../../../../assets/icons/general/starIcon.svg';
import { ReactComponent as NotStaredIcon } from '../../../../assets/icons/general/unStarIcon.svg';
import './TopListItem.scss';

interface ITopListItem {
	title?: string;
	rating?: string;
	year?: number;
	genre?: string;
}

const TopListItem = ({ title, year, genre, rating }: ITopListItem) => {
	return (
		<div className="top-list-item hover">
			<div className="top-list-item-row">
				<div className="top-list-item-name">{title}</div>
				<div className="top-list-item-percent">{rating}</div>
			</div>
			<div className="top-list-item-row">
				<div>
					<span className="top-list-item-info">
						{year}, {genre}
					</span>
				</div>
				<div className="recommend-item-rating">
					<StaredIcon className="top-star-icon" />
					<StaredIcon className="top-star-icon" />
					<StaredIcon className="top-star-icon" />
					<StaredIcon className="top-star-icon" />
					<NotStaredIcon className="top-star-icon" />
				</div>
			</div>
		</div>
	);
};

export default TopListItem;
