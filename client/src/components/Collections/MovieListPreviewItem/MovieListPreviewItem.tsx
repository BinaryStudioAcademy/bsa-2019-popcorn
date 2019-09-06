import React, { useState } from 'react';
import Image from '../../shared/Image/Image';
import config from '../../../config';
import './MovieListPreviewItem.scss';
import { Redirect } from 'react-router';
import { IMovieListPreview } from '../Collections';
import ReactTimeAgo from 'react-time-ago';
import { NavLink } from 'react-router-dom';

interface IProps {
	moviePreview: IMovieListPreview;
}

const MovieListPreviewItem: React.FC<IProps> = ({ moviePreview }) => {
	const [redirect, setRedirect] = useState(false);

	const moviesLength = moviePreview.moviesId.length;

	if (redirect) return <Redirect to={`/movie-list/${moviePreview.id}`} />;

	return (
		<div className="movie-list-preview" onClick={() => setRedirect(true)}>
			<div className="image-container">
				<Image
					src={moviePreview.imageUrl}
					defaultSrc={config.DEFAULT_MOVIELIST_IMAGE}
					alt="movie-list"
				/>
			</div>
			<div className="movie-list-preview-main">
				<div className="movie-list-preview-top">
					<div className="movie-preview-header">
						<div className="preview-title">{moviePreview.title}</div>
						<div className="movie-list-created">
							<ReactTimeAgo date={new Date(moviePreview.createdAt)} />
						</div>
					</div>
					<div className="preview-description">{moviePreview.description}</div>
					<NavLink
						className="user-info-container"
						to={`/user-page/${moviePreview.user.id}`}
					>
						<div className="user-image-container">
							<Image
								src={moviePreview.user.avatar}
								defaultSrc={config.DEFAULT_AVATAR}
								alt="avatar"
							/>
						</div>
						<div className="user-name">{moviePreview.user.name}</div>
					</NavLink>
				</div>
				<div className="movie-list-preview-bottom">
					<div className="preview-count-movies">
						The list of {moviesLength}&ensp;
						{moviesLength === 1 ? 'movie' : 'movies'}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieListPreviewItem;
