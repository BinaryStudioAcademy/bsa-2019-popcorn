import React, { useState, useEffect } from 'react';
import closeIcon from '../../../../../assets/icons/general/closeIcon.svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFilms, clearSearch } from '../../UserTops.redux/actions';
import { IMovie } from '../../UserTops.service';

interface IInputProps {
	movie: IMovie;
	deleteFilmInput: (movieId: number) => void;
	alreadySearch: boolean;
	fetchFilms: (title: string) => void;
	movieList: any[];
	clearSearch: () => void;
	saveMovie: (movie: IMovie, newId?: string) => void;
	last?: boolean;
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
	const [title, setTitle] = useState(movie.movie.title || '');
	const [comment, setComment] = useState(movie.comment || '');
	useEffect(() => {
		if (movie.movie.title === '') {
			setTitle('');
		}
		if (movie.comment === '') {
			setComment('');
		}
	});
	const [isChosenTitle, setIsChoosenTitle] = useState(false);
	const [isFocused, setFocused] = useState(false);

	function searchFilms(newTitle: string) {
		setTitle(newTitle);
		if (newTitle.trim().length > 2) {
			fetchFilms(newTitle);
		}
		setIsChoosenTitle(false);
	}

	function changeTitle({ newId, newTitle }) {
		setTitle(newTitle);
		setIsChoosenTitle(true);
		saveMovie({ ...movie, movie: { title: newTitle }, comment }, newId);
		clearSearch();
	}

	return (
		<div key={movie.id} className="film-input-item ">
			<input
				onChange={e => {
					saveMovie({ ...movie, movie: { title: e.target.value }, comment });
					searchFilms(e.target.value);
				}}
				maxLength={140}
				type="text"
				className="film-input"
				placeholder="Type film here"
				value={title}
				onFocus={() => setFocused(true)}
				onBlur={() => {
					if (title.trim() === '' && comment.trim() === '' && !last) {
						deleteFilmInput(movie.id);
					}
					if (!last) {
						clearSearch();
					}
				}}
			/>
			{!isChosenTitle && alreadySearch && isFocused ? (
				<div className="modal modal-top">
					{movieList && movieList.length > 0 ? (
						movieList.map((searchedMovie, index) => {
							return (
								<div
									className="hover"
									key={index}
									onClick={() => {
										changeTitle({
											newId: searchedMovie.id,
											newTitle: searchedMovie.title
										});
									}}
								>
									{searchedMovie.title}
								</div>
							);
						})
					) : (
							<span>Nothing was found</span>
						)}
				</div>
			) : null}
			<span>
				{!last && (
					<img
						src={closeIcon}
						onClick={() => deleteFilmInput(movie.id)}
						alt="close"
					/>
				)}
			</span>

			<textarea
				maxLength={140}
				disabled={title.trim() === '' && comment.trim() === ''}
				value={comment}
				onChange={e => {
					saveMovie({ ...movie, comment: e.target.value });
					setComment(e.target.value);
				}}
				className="film-input comment-film-input"
				placeholder="Type comment here"
			/>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	movieList: rootState.userTops.elasticSearchMovies,
	alreadySearch: rootState.userTops.alreadySearch,
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
