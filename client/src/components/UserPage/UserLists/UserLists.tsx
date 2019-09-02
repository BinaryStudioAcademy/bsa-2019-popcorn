import React from 'react';
import './UserLists.scss';
import MovieListCreator from './MovieListCreator/MovieListCreator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export interface INewMovieList {
	title: string;
	isPrivate: boolean;
	despription?: string;
	image_url?: string;
	moviesId: string[];
}

interface IProps {
	test: any;
}

const UserLists: React.FC<IProps> = ({ test }) => {
	console.log(test);
	const saveMovieList = (movieList: INewMovieList) => {
		console.log(movieList);
	};

	return (
		<div className="UserLists">
			<MovieListCreator saveMovieList={movieList => saveMovieList(movieList)} />
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	test: rootState.movieList.test
});

const mapDispatchToProps = dispatch => {
	const actions = {};

	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserLists);
