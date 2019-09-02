import React from 'react';
import './UserLists.scss';
import MovieListCreator from './MovieListCreator/MovieListCreator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveMovieList } from './actions';

export interface INewMovieList {
	title: string;
	isPrivate: boolean;
	despription?: string;
	image_url?: string;
	moviesId: string[];
}

interface IProps {
	saveMovieList: (movieList: INewMovieList) => object;
}

const UserLists: React.FC<IProps> = ({ saveMovieList }) => {
	return (
		<div className="UserLists">
			<MovieListCreator saveMovieList={saveMovieList} />
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	test: rootState.movieList.test
});

const mapDispatchToProps = dispatch => {
	const actions = {
		saveMovieList
	};

	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserLists);
