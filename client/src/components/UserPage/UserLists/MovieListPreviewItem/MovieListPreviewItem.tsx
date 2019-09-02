import React, { useState } from 'react';
import Image from '../../../shared/Image/Image';
import config from '../../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './MovieListPreviewItem.scss';

interface IProps {
	moviePreview: any; //*****//
	deleteMovieList: (movieListId: string) => object;
}

const MovieListPreviewItem: React.FC<IProps> = ({
	moviePreview,
	deleteMovieList
}) => {
	const [hover, setHover] = useState(false);
	const moviesLength = moviePreview.moviesId.length;
	return (
		<div
			className="movie-list-preview"
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
					<div className="preview-title">{moviePreview.title}</div>
					<div className="preview-description">{moviePreview.description}</div>
				</div>
				<div className="movie-list-preview-bottom">
					<div className="preview-count-movies">
						The list of {moviesLength}&ensp;
						{moviesLength === 1 ? 'movie' : 'movies'}
					</div>
				</div>
			</div>
			{hover && (
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
