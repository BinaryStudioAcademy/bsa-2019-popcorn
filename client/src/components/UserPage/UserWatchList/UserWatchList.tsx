import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWatchList } from './actions';
import TMovie from '../../MovieSeriesPage/TMovie';
import Spinner from '../../shared/Spinner';

interface IProps {
	watchList: Array<IWatchItem>;
	fetchWatchList: () => object;
}

interface IWatchItem {
	id: string;
	created_at: Date;
	movie: TMovie;
	status: string;
}

const UserWatchList: React.FC<IProps> = props => {
	const { watchList, fetchWatchList } = props;

	if (!watchList) {
		fetchWatchList();
		return <Spinner />;
	}

	const watchedList: Array<IWatchItem> = [];
	const toWatchList: Array<IWatchItem> = [];

	for(const item of watchList) {
		(item.status === "watched")
			? watchedList.push(item)
			: toWatchList.push(item)
	}

	return (
		<div className="UserWatchList">
			
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	...props,
	watchList: state.watchList.watchList
});

const mapDispatchToProps = dispatch => {
	const actions = {
		fetchWatchList
	};

	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserWatchList);
