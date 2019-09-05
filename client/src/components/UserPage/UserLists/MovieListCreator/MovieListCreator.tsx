import React, { useState } from 'react';
import './MovieListCreator.scss';
import { INewMovieList } from '../UserLists';
import ImageLoader from './ImageLoader/ImageLoader';
import MovieSearch from '../../../shared/MovieSearch/MovieSearch';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import config from '../../../../config';
import Image from '../../../shared/Image/Image';

interface IProps {
	saveMovieList: (movieList: INewMovieList) => object;
	setShowCreator: (openCreator: boolean) => void;
}

const MovieListCreator: React.FC<IProps> = ({
	saveMovieList,
	setShowCreator
}) => {
	const [title, setTitle] = useState(''),
		[description, setDescription] = useState(''),
		[imageUrl, setImageUrl] = useState(''),
		[moviesDetails, setMoviesDetails]: any[] = useState([]),
		[isPrivate, setIsPrivate] = useState(false),
		[isDropDownOpen, setIsDropDownOpen] = useState(false);

	const onSelectMovie = movie => {
		const index = moviesDetails.findIndex(item => item.id === movie.id);
		if (index === -1) {
			setMoviesDetails([...moviesDetails, movie]);
		}
	};

	const elasticProperties = ['id', 'title', 'poster_path', 'release_date'];

	const onSaveMovieList = () => {
		if (!title || moviesDetails.length == 0) {
			// show error
			return;
		}
		const movieList = {
			title,
			description,
			imageUrl,
			moviesId: moviesDetails.map(movie => movie.id),
			isPrivate
		};
		saveMovieList(movieList);
		setShowCreator(false);
	};

	const onDeleteMovieLabel = movieId => {
		setMoviesDetails(moviesDetails.filter(movie => movie.id !== movieId));
	};

	const DROPDOWN_LABEL = isPrivate ? 'Private' : 'Public';

	return (
		<div className="MovieListCreator">
			<div className="form-inputs-container">
				<div className="form-item">
					<label htmlFor="movie-list-title" className="item-label">
						Title:
					</label>
					<input
						id="movie-list-title-input"
						type="text"
						className="item-input"
						value={title}
						onChange={ev => setTitle(ev.target.value)}
						placeholder="Title"
					/>
				</div>
				<div className="form-item textarea">
					<label
						htmlFor="movie-list-description"
						className="item-label item-label-descriontion"
					>
						Description:
					</label>
					<textarea
						id="movie-list-description-input"
						className="item-input"
						value={description}
						onChange={ev => setDescription(ev.target.value)}
						rows={3}
						placeholder="Description"
					/>
				</div>
				<div className="form-item">
					<label className="item-label">Privacy: </label>
					<div className="item-right-content-container">
						<div
							className={isDropDownOpen ? 'dropdown active' : 'dropdown'}
							onClick={() => setIsDropDownOpen(!isDropDownOpen)}
						>
							<div className="dropdown__text">{DROPDOWN_LABEL}</div>
							<div className="dropdown__items">
								<div
									onClick={() => setIsPrivate(false)}
									className="dropdown__item"
								>
									Public
								</div>
								<div
									onClick={() => setIsPrivate(true)}
									className="dropdown__item"
								>
									Private
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="form-item">
					<label className="item-label item-label-image">Image:</label>
					<div className="item-right-content-container">
						{imageUrl === '' ? (
							<ImageLoader
								setImageUrl={setImageUrl}
								isIcon={false}
								aspectRatio={1}
							/>
						) : (
							<div
								className="image-preview-container"
								onClick={() => setImageUrl('')}
							>
								<img className="cover" src={imageUrl} alt="movie-list-image" />
							</div>
						)}
					</div>
				</div>
				<div className="form-item">
					<label className="item-label item-label-search">Movies: </label>
					<div className="item-right-content-container">
						<div className="movie-search-container">
							<MovieSearch
								elasticProperties={elasticProperties}
								onSelectMovie={onSelectMovie}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="movie-list-preview-container">
				{moviesDetails.map(movie => (
					<div key={movie.id} className="movie-preview-item">
						<div className="preview-image-container">
							<Image
								src={`${config.POSTER_PATH}/${movie.poster_path}`}
								defaultSrc={config.DEFAULT_MOVIE_IMAGE}
								alt="poster"
							/>
							<div
								className="preview-delete-movie"
								onClick={() => onDeleteMovieLabel(movie.id)}
							>
								<FontAwesomeIcon
									className="preview-delete-icon"
									icon={faTimes}
									title="Click to delete from the list"
								/>
							</div>
						</div>
						<div className="preview-main">
							<div className="preview-movie-title">
								{movie.title}
								<span className="preview-movie-date">
									{movie.release_date
										? ' (' + movie.release_date.slice(0, 4) + ')'
										: null}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="movie-list-creator-buttons">
				<button
					className="movie-creator-cancel-button"
					onClick={() => setShowCreator(false)}
				>
					cancel
				</button>
				<button className="movie-creator-save-button" onClick={onSaveMovieList}>
					save
				</button>
			</div>
		</div>
	);
};

export default MovieListCreator;
