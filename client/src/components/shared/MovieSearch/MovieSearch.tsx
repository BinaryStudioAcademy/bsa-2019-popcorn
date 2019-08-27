import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchTitle, deleteSearchData } from './actions';
import './MovieSearch.scss';

interface IProps {
	searchData?: Array<IMovieTitle>;
	searchTitle: (inputData: string) => object;
	isLoading?: boolean;
	deleteSearchData: () => object;
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
	deleteSearchData: actionDeleteSearchData
}) => {
	const [inputData, setInputData] = useState('');
	const [focus, setFocus] = useState(false);

	const onInputChange = e => {
		if (timerId) clearTimeout(timerId);
		const inputData = e.target.value;
		if (inputData.trim().length !== 0) {
			timerId = setTimeout(() => actionSearchTitle(inputData), 1000);
		}
		setInputData(inputData);
	};

	const renderMovieTitles = searchData => {
		return searchData.length === 0 ? (
			<div className="not-found-message">Not found</div>
		) : (
			searchData.map(item => (
				<div key={item.id} className="movie-search-label">
					{' '}
					{item.title}
				</div>
			))
		);
	};

	if (inputData.length === 0 && searchData) {
		actionDeleteSearchData();
	}

	const isRenderList = inputData.length !== 0 && searchData && focus;

	return (
		<div className="MovieSearch">
			<input
				className="input-serch-movie"
				onChange={e => onInputChange(e)}
				value={inputData}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			/>
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
	isLoading: state.searchMovie.isLoading
});

const mapDispatchToProps = dispatch => {
	const actions = {
		searchTitle,
		deleteSearchData
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieSearch);
