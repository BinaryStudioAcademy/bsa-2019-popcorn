import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	searchTitle,
	deleteSearchData,
	fetchMovieProperties,
	deleteSelectedData
} from './actions';
import './MovieSearch.scss';

interface IProps {
	searchData?: Array<IMovieTitle>;
	searchTitle: (inputData: string) => object;
	isLoading?: boolean;
	deleteSearchData: () => object;
	onSelectMovie: (movie: any) => any;
	elasticProperties: Array<string>;
	fetchMovieProperties: (movieId: string, properties: Array<string>) => object;
	selectMovie: any;
	deleteSelectedData: () => object;
}
interface IMovieTitle {
	id: string;
	title: string;
}

let timerId;

const MovieSearch: React.FC<IProps> = ({
	searchData,
	searchTitle: actionSearchTitle,
	isLoading,
	deleteSearchData: actionDeleteSearchData,
	elasticProperties,
	onSelectMovie,
	fetchMovieProperties: actionFetchMovieProperties,
	selectMovie,
	deleteSelectedData: actionDeleteSelectedData
}) => {
	const [inputData, setInputData] = useState('');
	const [focus, setFocus] = useState(false);
	const [isTimerOn, setTimerOn] = useState(false);

	if (selectMovie) {
		onSelectMovie(selectMovie);
		actionDeleteSelectedData();
	}

	const onInputChange = e => {
		if (timerId) {
			clearTimeout(timerId);
		}
		const inputData = e.target.value;
		if (inputData.trim().length !== 0) {
			setTimerOn(true);
			timerId = setTimeout(() => {
				actionSearchTitle(inputData);
				setTimerOn(false);
			}, 550);
		}
		setInputData(inputData);
	};

	const renderMovieTitles = searchData => {
		return searchData.length === 0 ? (
			<div className="not-found-message">Not found</div>
		) : (
			searchData.map(item => (
				<div
					key={item.id}
					className="movie-search-label"
					onClick={() => onClickMovieItem(item.id, item.title)}
				>
					{' '}
					{item.title}
				</div>
			))
		);
	};

	const onClickMovieItem = (movieId, title) => {
		elasticProperties.join(',') === 'id,title'
			? onSelectMovie({ id: movieId, title })
			: actionFetchMovieProperties(movieId, elasticProperties);
		setInputData('');
		setFocus(false);
	};

	if (inputData.length === 0 && searchData) {
		actionDeleteSearchData();
	}

	if (isTimerOn && inputData.length === 0) {
		setTimerOn(false);
	}

	const isRenderList = inputData.length !== 0 && searchData && focus;

	return (
		<div className="MovieSearch">
			<div className="search-input-container">
				<input
					className="input-serch-movie"
					onChange={e => onInputChange(e)}
					value={inputData}
					onFocus={() => setFocus(true)}
					placeholder="Search"
					// onBlur={() => setFocus(false)}
				/>
				{(isLoading || isTimerOn) && (
					<span className="loader-container">loading...</span>
				)}
			</div>
			<div className="results-container">
				{isRenderList && (
					<div className="movie-search-results">
						{renderMovieTitles(searchData)}
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	...props,
	searchData: state.searchMovie.searchData,
	isLoading: state.searchMovie.isLoading,
	selectMovie: state.searchMovie.selectMovie
});

const mapDispatchToProps = dispatch => {
	const actions = {
		searchTitle,
		deleteSearchData,
		fetchMovieProperties,
		deleteSelectedData
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieSearch);
