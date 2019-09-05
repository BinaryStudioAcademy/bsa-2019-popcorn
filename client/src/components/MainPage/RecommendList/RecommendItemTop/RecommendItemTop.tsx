import React from 'react';
import '../RecommendItem.scss';
import { NavLink } from 'react-router-dom';
import config from '../../../../config';

type RecommendItemProps = {
	top: {
		id: string;
		title: string;
		topImageUrl: string;
		movieInTop: any;
		user: any;
	};
};

const getReleaseYear = movie => movie.movie.release_date.split('-')[0];

const RecommendItemTop = ({
	top: { id, title, topImageUrl, movieInTop, user }
}: RecommendItemProps) => {
	const getAdditionalInfo = () => {
		return movieInTop.length > 3
			? `And ${movieInTop.length - 3} others`
			: 'View details';
	};

	return (
		<div className="recommend-item">
			<div className="recommend-item-header">
				<div className="recommend-item-header-text">
					<strong>Top</strong>
				</div>
			</div>
			<div className="recommend-item-wrp">
				<img
					className="recommend-item-image"
					src={topImageUrl ? topImageUrl : config.DEFAULT_TOP_IMAGE}
					alt="event"
				/>
			</div>
			<div className="recommend-item-info">
				<div className="recommend-item-row">
					<div className="recommend-item-name">{title}</div>
				</div>
			</div>
			<div
				style={{ marginBottom: '2px' }}
				className="recommend-item-row top-preview"
			>
				<ol>
					{movieInTop.slice(0, 3).map(movie => (
						<li>
							{movie.movie.title} ({getReleaseYear(movie)})
						</li>
					))}
				</ol>
			</div>
			<div
				style={{ marginTop: '2px' }}
				className="recommend-item-row top-preview"
			>
				<NavLink to={`/tops/${id}`}>
					<div className="add-info">{getAdditionalInfo()}</div>
				</NavLink>

				<NavLink to={`/user-page/${user.id}`}>
					<div className="creator-info">
						<img className="creator-avatar" src={user.avatar} />
						<span className="creator-name">{user.name}</span>
					</div>
				</NavLink>
			</div>
		</div>
	);
};

export default RecommendItemTop;
