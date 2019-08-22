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
		avatar: string;
		name: string;
	};
}

interface ITopLIstItemProps {
	top: ITop;
}

const TopListItem: React.FC<ITopLIstItemProps> = ({ top }) => {
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
				<div>{top.title}</div>
				<div>
					<ol>
						{top.movieInTop.slice(0, 3).map(movie => (
							<li>{movie.movie.original_title}</li>
						))}
					</ol>
				</div>
			</div>
			<div className="top-secondary-section">
				<div>
					<div>
						<img src={top.user.avatar} alt="user" />
						{top.user.name}
					</div>

					<Moment format="ll" local>
						{String(top.created_at)}
					</Moment>
				</div>
				<NavLink to={`/top-page/${top.id}`}>
					<button type="button">View all</button>
				</NavLink>
			</div>
		</div>
	);
};

export default TopListItem;
