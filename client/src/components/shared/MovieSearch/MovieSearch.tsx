import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchTitle } from './actions';

interface IProps {
	searchData?: Array<IMovieTitle>;
	searchTitle: (inputData: string) => object;
}
interface IMovieTitle {
	id: string;
	title: string;
}

const MovieSearch: React.FC<IProps> = ({
	searchData,
	searchTitle: actionSearchTitle
}) => {
	if (!searchData) {
		actionSearchTitle('2');
	}

	console.log(searchData);

	return <div className="MovieSearch">Best Search in your life</div>;
};

const mapStateToProps = (state, props) => ({
	...props,
	searchData: state.searchMovie.searchData
});

const mapDispatchToProps = dispatch => {
	const actions = {
		searchTitle
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieSearch);
