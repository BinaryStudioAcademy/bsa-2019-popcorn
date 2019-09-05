import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	searchTitle,
	deleteSearchData,
	fetchMovieProperties,
	deleteSelectedData
} from './../../shared/MovieSearch/actions';
import './../../shared/MovieSearch/MovieSearch.scss';

interface IProps {
	searchData?: IMovieTitle[];
	isLoading?: boolean;
	deleteSearchData: () => object;
	onSelectMovie: (movie: any) => any;
	elasticProperties: string[];
	fetchMovieProperties: (movieId: string, properties: string[]) => object;
	selectMovie: any;
	deleteSelectedData: () => object;
	searchTitle: (inputData: string) => object;
	inputData: string;
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
	deleteSelectedData: actionDeleteSelectedData,
	inputData
}) => {
	const [isTimerOn, setTimerOn] = useState(false);

	if (selectMovie) {
		onSelectMovie(selectMovie);
		actionDeleteSelectedData();
	}

	useEffect(() => {
		if (timerId) clearTimeout(timerId);
		if (inputData.trim().length !== 0) {
			setTimerOn(true);
			timerId = setTimeout(() => {
				actionSearchTitle(inputData);
				setTimerOn(false);
			}, 550);
		}
	});

	const renderMovieTitles = searchData => {
		return searchData.map(item => (
			<div
				key={item.id}
				className="movie-search-label"
				onClick={() => onClickMovieItem(item.id, item.title)}
			>
				{' '}
				{item.title}
			</div>
		));
	};

	const onClickMovieItem = (movieId, title) => {
		onSelectMovie({ id: movieId, title });
	};
	if (inputData.length === 0 && searchData) {
		actionDeleteSearchData();
	}

	if (isTimerOn && inputData.length === 0) {
		setTimerOn(false);
	}

	const isRenderList = inputData.length !== 0 && searchData;

	return (
		<div className="MovieSearch">
			{(isLoading || isTimerOn) && (
				<div className="search-input-container">
					<span className="loader-container">loading...</span>
				</div>
			)}
			{isRenderList && (
				<div className="results-container">
					<div className="movie-search-results">
						{renderMovieTitles(searchData)}
					</div>
				</div>
			)}
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
