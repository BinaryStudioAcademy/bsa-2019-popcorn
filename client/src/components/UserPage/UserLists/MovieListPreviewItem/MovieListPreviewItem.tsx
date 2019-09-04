import React, { useState } from 'react';
import Image from '../../../shared/Image/Image';
import config from '../../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faLock } from '@fortawesome/free-solid-svg-icons';
import './MovieListPreviewItem.scss';
import { Redirect } from 'react-router';
import { IMovieListPreview } from '../UserLists';

interface IProps {
	moviePreview: IMovieListPreview;
	deleteMovieList: (movieListId: string) => object;
	isOwnData: boolean;
}

const MovieListPreviewItem: React.FC<IProps> = ({
	moviePreview,
	deleteMovieList,
	isOwnData
}) => {
	const [hover, setHover] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const moviesLength = moviePreview.moviesId.length;

	if (redirect) return <Redirect to={`/movie-list/${moviePreview.id}`} />;

	return (
		<div
			className="movie-list-preview"
			onClick={() => setRedirect(true)}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<div className="image-container">
				<Image
					src={moviePreview.image_url}
					defaultSrc={config.DEFAULT_MOVIELIST_IMAGE}
					alt="movie-list"
				/>
			</div>
			<div className="movie-list-preview-main">
				<div className="movie-list-preview-top">
					<div className="preview-title">
						{moviePreview.title}
						{moviePreview.isPrivate && (
							<FontAwesomeIcon className="lock-icon" icon={faLock} />
						)}
					</div>
					<div className="preview-description">{moviePreview.description}</div>
				</div>
				<div className="movie-list-preview-bottom">
					<div className="preview-count-movies">
						The list of {moviesLength}&ensp;
						{moviesLength === 1 ? 'movie' : 'movies'}
					</div>
				</div>
			</div>
			{hover && isOwnData && (
				<div
					className="button-absolute-position"
					onClick={() => deleteMovieList(moviePreview.id)}
				>
					<FontAwesomeIcon
						className="preview-delete-button absolute"
						icon={faTimes}
						title="Click to delete from movie list"
					/>
				</div>
			)}
		</div>
	);
};

export default MovieListPreviewItem;
