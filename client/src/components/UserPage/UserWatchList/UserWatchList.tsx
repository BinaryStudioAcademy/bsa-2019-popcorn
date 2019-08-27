import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWatchList } from './actions';
import TMovie from '../../MovieSeriesPage/TMovie';
import Spinner from '../../shared/Spinner';
import './UserWatchList.scss';
import WatchItem from './WatchItem/WatchItem';

interface IProps {
	watchList: Array<IWatchItem>;
	fetchWatchList: () => object;
}

export interface IWatchItem {
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

	for (const item of watchList) {
		item.status === 'watched' ? watchedList.push(item) : toWatchList.push(item);
	}

	const renderWatchList = (list: Array<IWatchItem>) =>
		list.map(item => <WatchItem watchItem={item} key={item.id} />);

	return (
		<div className="UserWatchList">
			<div className="user-watch-list-container">
				<div className="to-watch-block">
					<div className="watch-block-name">To watch</div>
					{/* FieldInput */}
					<div className="field-input">
						<input type="text" />
						<button>Add</button>
					</div>
					{/* FieldInput */}
					{renderWatchList(toWatchList)}
				</div>

				<div className="watched-block">
					<div className="watch-block-name">Watched</div>
					{/* FieldInput */}
					<div className="field-input">
						<input type="text" />
						<button>Add</button>
					</div>
					{/* FieldInput */}
					{renderWatchList(watchedList)}
				</div>
			</div>
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
