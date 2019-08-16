import React, { useState } from 'react';
import closeIcon from '../../../../../assets/icons/general/closeIcon.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearSearch } from '../../../../MovieSeriesPage/Movie.redux/actions';
import { fetchFilms } from '../../actions';
import { IMovie } from '../TopItem';

interface IInputProps {
	movie: IMovie;
	deleteFilmInput: (movieId: string) => void;
	alreadySearch: boolean;
	fetchFilms: (title: string) => void;
	movieList: Array<any>; //movies from elastic search
	clearSearch: () => void;
	saveMovie: (movie: IMovie) => void;
	last?: boolean
}
const FilmInput: React.FC<IInputProps> = ({
	saveMovie,
	clearSearch,
	movie,
	deleteFilmInput,
	alreadySearch,
	movieList,
	fetchFilms,
	last
}) => {
	const [title, setTitle] = useState(movie.title);
	const [comment, setComment] = useState(movie.comment);
	const [isChosenTitle, setIsChoosenTitle] = useState(false);
	const [isFocused, setFocused] = useState(false);
	function searchFilms(title: string) {
		setTitle(title);
		if (title.trim().length > 2) fetchFilms(title);
		setIsChoosenTitle(false);
	}

	function changeTitle({ movieId, title }) {
		setTitle(title);
		setIsChoosenTitle(true);
		saveMovie({ ...movie, id: movieId, title, comment });
	}

	return (
		<div key={movie.id} className="film-input-item ">
			<input
				onChange={e => {
					saveMovie({ ...movie, title, comment });
					searchFilms(e.target.value);
				}}
				maxLength={140}
				type="text"
				className="film-input"
				placeholder="Type film here"
				value={title}
				onFocus={() => setFocused(true)}
				onBlur={() => { 
					clearSearch(); 
					if (title.trim() === '' && comment.trim() === '')
					deleteFilmInput(movie.id);
				}}
			/>
			{!isChosenTitle && alreadySearch && isFocused ? (
				<div className="modal modal-top">
					{movieList && movieList.length > 0 ? (
						movieList.map((searchedMovie, index) => (
							<div
								className="hover"
								key={index}
								onClick={() =>
									changeTitle({
										movieId: movie.id,
										title: searchedMovie._source.title
									})
								}
							>
								{searchedMovie._source.title}
							</div>
						))
					) : (
						<span>Nothing was found</span>
					)}
				</div>
			) : null}
			{
				!last &&
				<img
					src={closeIcon}
					onClick={() => deleteFilmInput(movie.id)}
					alt="close"
				/>
			}
			{
				last && 
				<div></div>
			}

			<textarea
				maxLength={140}
				disabled={title.trim() === ''}
				value={comment}
				onChange={e => {
					setComment(e.target.value);
				}}
				className="film-input comment-film-input"
				placeholder="Type comment here"
			></textarea>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	movieList: rootState.movie.elasticSearchMovies,
	alreadySearch: rootState.movie.alreadyElasticSearch,
	...props
});
const actions = {
	fetchFilms,
	clearSearch
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FilmInput);
