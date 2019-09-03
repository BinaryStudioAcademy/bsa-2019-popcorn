import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface IProps {
	match: any;
	currentUserId: string;
}

const UserMovieList: React.FC<IProps> = ({ ...props }) => {
	return <div className="UserMovieList">MovieList</div>;
};

const mapStateToProps = (rootState, props) => ({
	...props
	// movieList
});

const mapDispatchToProps = dispatch => {
	const actions = {
		//fetchMovieList
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserMovieList);
