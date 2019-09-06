import React from 'react';
import { connect } from 'react-redux';
import { fetchAllMovieLists } from '../UserPage/UserLists/actions';
import { bindActionCreators } from 'redux';
import Spinner from '../shared/Spinner';
import MovieListPreviewItem from './MovieListPreviewItem/MovieListPreviewItem';
import './Collections.scss';

interface IProps {
	allMovieLists: IMovieListPreview[];
	fetchAllMovieLists: () => object;
}

export interface IMovieListPreview {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	isPrivate: boolean;
	moviesId: string[];
	createdAt: Date;
	user: {
		id: string;
		avatar: string;
		name: string;
	};
}

const Collections: React.FC<IProps> = ({
	allMovieLists,
	fetchAllMovieLists
}) => {
	if (!allMovieLists) {
		fetchAllMovieLists();
		return <Spinner />;
	}

	return (
		<div className="Collections">
			{allMovieLists.length ? (
				<div className="movie-list-preview-container">
					{allMovieLists.map(preview => (
						<MovieListPreviewItem key={preview.id} moviePreview={preview} />
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
	allMovieLists: rootState.movieList.allMovieLists
});

const mapDispatchToProps = dispatch => {
	const actions = {
		fetchAllMovieLists
	};

	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Collections);
