import React, { useState, useEffect } from 'react';
import './UserLists.scss';
import MovieListCreator from './MovieListCreator/MovieListCreator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	saveMovieList,
	fetchMovieListsPreview,
	deleteMovieList
} from './actions';
import Spinner from '../../shared/Spinner';
import MovieListPreviewItem from './MovieListPreviewItem/MovieListPreviewItem';

export interface INewMovieList {
	title: string;
	isPrivate: boolean;
	despription?: string;
	image_url?: string;
	moviesId: string[];
}

interface IProps {
	saveMovieList: (movieList: INewMovieList) => object;
	fetchMovieListsPreview: (userId: string) => object;
	deleteMovieList: (movieListId: string) => object;
	movieListsPreview?: Array<any>;
	isLoading: boolean;
	selectedUserId: string;
	isOwnData: boolean;
	selectedPreviewUserId?: string;
}

const UserLists: React.FC<IProps> = ({
	saveMovieList,
	fetchMovieListsPreview,
	movieListsPreview,
	deleteMovieList,
	isLoading,
	selectedUserId,
	isOwnData,
	selectedPreviewUserId
}) => {
	const [showCreator, setShowCreator] = useState(false);

	if (!movieListsPreview || selectedPreviewUserId !== selectedUserId) {
		fetchMovieListsPreview(selectedUserId);
		return <Spinner />;
	}

	if (isLoading) {
		return <Spinner />;
	}

	if (showCreator) {
		return (
			<MovieListCreator
				setShowCreator={setShowCreator}
				saveMovieList={saveMovieList}
			/>
		);
	}
	return (
		<div className="UserLists">
			{isOwnData && (
				<button
					className="create-movie-list-button"
					onClick={() => setShowCreator(true)}
				>
					Create movie list
				</button>
			)}
			{movieListsPreview.length ? (
				<div className="movie-list-preview-container">
					{movieListsPreview.map(preview => (
						<MovieListPreviewItem
							key={preview.id}
							deleteMovieList={deleteMovieList}
							moviePreview={preview}
						/>
					))}
				</div>
			) : (
				<div className="movie-list-empty">No movie lists yet</div>
			)}
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	movieListsPreview: rootState.movieList.movieListsPreview,
	isLoading: rootState.movieList.isLoading,
	selectedPreviewUserId: rootState.movieList.selectedPreviewUserId
});

const mapDispatchToProps = dispatch => {
	const actions = {
		saveMovieList,
		fetchMovieListsPreview,
		deleteMovieList
	};

	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserLists);
