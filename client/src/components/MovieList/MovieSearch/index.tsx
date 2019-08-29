// @ts-ignore
import searchIcon from '../../../assets/icons/general/header/search-icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useRef } from 'react';
import MovieList from '../MovieList';
import { NavLink } from 'react-router-dom';

interface IMovieSearch {
	movies: any;
	fetchFilms: (data: string) => void;
	alreadySearch: boolean;
	setMovieSeries: (movie: any) => any;
}

const MovieSearch: React.FC<IMovieSearch> = ({
	movies,
	fetchFilms,
	alreadySearch,
	setMovieSeries
}) => {
	const [value, setValue] = useState('');
	const [focusInput, setFocusInput] = useState(false);
	const inputSearch: any = useRef(null);

	const startFetchFilms = () => {
		if (value.trim() !== '') {
			fetchFilms(value.trim());
		}
	};

	function handleChangeInput(data) {
		setValue(data);
		startFetchFilms();
	}

	function setFocus(focus: boolean): void {
		if (focus) {
			inputSearch.current.focus();
		} else {
			inputSearch.current.blur();
		}
	}

	return (
		<div className="search-area">
			<span className="search">
				<img
					className="search-icon hover"
					src={searchIcon}
					alt="search"
					onClick={e => setFocus(true)}
				/>
				<input
					type="text"
					placeholder="Search"
					value={value}
					className="search-input"
					ref={inputSearch}
					onChange={e => handleChangeInput(e.target.value)}
					onFocus={e => setFocusInput(true)}
					onBlur={e => setFocusInput(false)}
				/>
			</span>
			<span className="filter hover">
				<NavLink to={'/advanced-search'}>
					Filter
					<FontAwesomeIcon icon={faChevronDown} />
				</NavLink>
				{focusInput && value.trim() ? (
					<div className="modal">
						{movies && movies.length > 0 ? (
							<MovieList movies={movies} setMovieSeries={setMovieSeries} />
						) : (
							<span>Nothing was found</span>
						)}
					</div>
				) : null}
			</span>
		</div>
	);
};

export default MovieSearch;
