import React, { useState } from 'react';
import './UserLists.scss';
import MovieListCreator from './MovieListCreator/MovieListCreator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveMovieList, fetchMovieListsPreview } from './actions';
import Spinner from '../../shared/Spinner';

export interface INewMovieList {
	title: string;
	isPrivate: boolean;
	despription?: string;
	image_url?: string;
	moviesId: string[];
}

interface IProps {
	saveMovieList: (movieList: INewMovieList) => object;
	fetchMovieListsPreview: () => object;
	movieListsPreview?: Array<any>;
}

const UserLists: React.FC<IProps> = ({
	saveMovieList,
	fetchMovieListsPreview,
	movieListsPreview
}) => {
	const [showCreator, setShowCreator] = useState(false);

	if (!movieListsPreview) {
		fetchMovieListsPreview();
		return <Spinner />;
	}

	return (
		<div className="UserLists">
			{showCreator ? (
				<MovieListCreator
					setShowCreator={setShowCreator}
					saveMovieList={saveMovieList}
				/>
			) : (
				<button onClick={() => setShowCreator(true)}>CREATE</button>
			)}
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	movieListsPreview: rootState.movieList.movieListsPreview
});

const mapDispatchToProps = dispatch => {
	const actions = {
		saveMovieList,
		fetchMovieListsPreview
	};

	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserLists);
