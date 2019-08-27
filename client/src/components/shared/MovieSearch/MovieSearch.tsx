import React from 'react';
import { connect } from 'react-redux';

const MovieSearch: React.FC = props => {
	return <div className="MovieSearch">Best Search in your life</div>;
};

const mapStateToProps = (state, props) => ({
	...props,
	searchData: state.searchMovie.searchData
});

export default connect(mapStateToProps)(MovieSearch);
