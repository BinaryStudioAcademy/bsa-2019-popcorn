import React from 'react';
import config from '../../config';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
import Image from '../shared/Image/Image';

export interface ITop {
	id: string;
	title: string;
	topImageUrl: string;
	created_at?: Date;
	movieInTop: Array<any>;
	user?: {
		id: string;
		avatar: string;
		name: string;
	};
}

interface ITopLIstItemProps {
	top: ITop;
}

const TopListItem: React.FC<ITopLIstItemProps> = ({ top }) => {
	const getReleaseYear = movie => {
		let date = null;
		if (movie && movie.movie && movie.movie.release_date) {
			date = movie.movie.release_date.split('-')[0];
		}
		else if (movie && movie.release_date) {
			date = movie.release_date.split('-')[0];
		}
		return date;
	}

	const getAdditionalInfo = () => {
		return top.movieInTop.length > 3
			? `And ${top.movieInTop.length - 3} others`
			: 'View details';
	};

	return (
		<div className="top-page-item">
			<div className="top-image-section">
				<NavLink to={`/tops/${top.id}`}>
					<Image
						src={top.topImageUrl}
						defaultSrc={config.DEFAULT_TOP_IMAGE}
						alt="top-image"
						className="top-page-item-img"
					/>
				</NavLink>
			</div>
			<div className="top-main-section">
				<NavLink to={`/tops/${top.id}`}>
					<div className="top-title">{top.title}</div>
				</NavLink>

				<div>
					<ol>
						{top.movieInTop.slice(0,3).map(movie => (
							<li key={movie.id}>
								<NavLink to={`/movies/${movie.movie ? movie.movie.id : movie.id}`}>
									{movie && movie.movie ? movie.movie.title : movie.title} ({getReleaseYear(movie)})
								</NavLink>
							</li>
						))}
					</ol>
				</div>
			</div>
			{top.user && <div className="top-secondary-section">
				<NavLink to={`/user-page/${top.user.id}`}>
					<div className="user-info">
						<Image
							src={top.user.avatar}
							alt="user"
							defaultSrc={config.DEFAULT_AVATAR}
						/>
						<span className="user-name">{top.user.name}</span>
					</div>
				</NavLink>
				<Moment format="ll" local className="created-at">
					{String(top.created_at)}
				</Moment>
				<NavLink to={`/tops/${top.id}`}>
					<div className="add-info">{getAdditionalInfo()}</div>
				</NavLink>
			</div>
			}
		</div>
	);
};

export default TopListItem;
