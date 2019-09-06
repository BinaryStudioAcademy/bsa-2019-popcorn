import React from 'react';
import { fetchTops } from './TopListPage.redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../shared/Spinner';
import TopListItem from './TopListItem';
import './TopList.scss';

interface ITopLIstProps {
	tops: Array<{
		id: string;
		title: string;
		topImageUrl: string;
		created_at: Date;
		movieInTop: Array<any>;
		user: {
			id: string;
			avatar: string;
			name: string;
		};
	}>;
	fetchTops: () => any;
	passedTop?: any;
}

const TopList: React.FC<ITopLIstProps> = props => {
	if (!props.tops && !props.passedTop) {
		props.fetchTops();
		return <Spinner />;
	}

	const topListItems = !props.passedTop ? (
		props.tops.map(top => <TopListItem key={top.id} top={top} />)
	) : (
		<TopListItem top={props.passedTop} />
	);

	return <div className="top-list-wrapper">{topListItems}</div>;
};

const mapStateToProps = (rootState, props) => ({
	...props,
	tops: rootState.topList.tops
});

const actions = {
	fetchTops
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TopList);
