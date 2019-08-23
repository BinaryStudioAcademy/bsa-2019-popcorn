import React from 'react';
import config from '../../config';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';

interface ITop {
	id: string;
	title: string;
	topImageUrl: string;
	created_at: Date;
	movieInTop: Array<any>;
	user: {
		id: string;
		avatar: string;
		name: string;
	};
}

interface ITopLIstItemProps {
	top: ITop;
}

const TopListItem: React.FC<ITopLIstItemProps> = ({ top }) => {
	const getReleaseYear = movie => movie.movie.release_date.split('-')[0];

	const getAdditionalInfo = () => {
		return top.movieInTop.length > 3
			? `And ${top.movieInTop.length - 3} others`
			: 'View details';
	};

	return (
		<div className="top-page-item">
			<div className="top-image-section">
				<img
					className="top-page-item-img"
					src={top.topImageUrl || config.DEFAULT_TOP_IMAGE}
					alt="top-image"
				/>
			</div>
			<div className="top-main-section">
				<NavLink to={`/top-page/${top.id}`}>
					<div className="top-title">{top.title}</div>
				</NavLink>

				<div>
					<ol>
						{top.movieInTop.slice(0, 3).map(movie => (
							<li>
								{movie.movie.original_title} ({getReleaseYear(movie)})
							</li>
						))}
					</ol>
					<NavLink to={`/top-page/${top.id}`}>
						<div className="add-info">{getAdditionalInfo()}</div>
					</NavLink>
				</div>
			</div>
			<div className="top-secondary-section">
				<NavLink to={`/user-page/${top.user.id}`}>
					<div className="user-info">
						<span className="user-name">{top.user.name}</span>
						<img src={top.user.avatar} alt="user" />
					</div>
				</NavLink>
				<Moment format="ll" local className="created-at">
					{String(top.created_at)}
				</Moment>
			</div>
		</div>
	);
};

export default TopListItem;
