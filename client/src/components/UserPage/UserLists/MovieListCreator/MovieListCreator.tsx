import React, { useState } from 'react';
import './MovieListCreator.scss';
import { INewMovieList } from '../UserLists';
import ImageLoader from './ImageLoader/ImageLoader';
import MovieSearch from '../../../shared/MovieSearch/MovieSearch';

interface IProps {
	saveMovieList: (movieList: INewMovieList) => void;
}

const MovieListCreator: React.FC<IProps> = () => {
	const [title, setTitle] = useState(''),
		[description, setDescription] = useState(''),
		[imageUrl, setImageUrl] = useState(''),
		[moviesDetails, setMoviesDetails]: Array<any> = useState([]),
		[isPrivate, setIsPrivate] = useState(false);

	const onSelectMovie = movie => {
		setMoviesDetails([movie, ...moviesDetails]);
	};
	const elasticProperties = ['id', 'title'];

	return (
		<div className="MovieListCreator">
			<div className="form-inputs-container">
				<div className="form-item">
					<label htmlFor="movie-list-title" className="item-label">
						title:
					</label>
					<input id="movie-list-title" type="text" className="item-input" />
				</div>
				<div className="form-item">
					<label htmlFor="movie-list-description" className="item-label">
						description:
					</label>
					<textarea id="movie-list-description" className="item-input" />
				</div>
				<div className="form-item">
					<label htmlFor="" className="item-label">
						photo:
					</label>
					<ImageLoader setImageUrl={setImageUrl} />
				</div>
				<div className="form-item">
					<label htmlFor="movie-list-privacy" className="item-label">
						Privacy:
					</label>
					<input
						id="movie-list-privacy"
						type="checkbox"
						className="item-input"
					/>
				</div>
			</div>

			<MovieSearch
				elasticProperties={elasticProperties}
				onSelectMovie={onSelectMovie}
			/>
			{moviesDetails.map(movie => (
				<div key={movie.id}>{movie.title}</div>
			))}

			<div className="movie-list-creator-buttons">
				<button className="movie-list-save-btn">cancel</button>
				<button className="movie-list-cancel-btn">save</button>
			</div>

			<img className="movie-list-img" src={imageUrl} />
		</div>
	);
};

export default MovieListCreator;
