import React from 'react';
import { fetchTops } from './TopListPage.redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface ITopLIstProps {
	tops: [];
	fetchTops: () => any;
}

const TopList: React.FC<ITopLIstProps> = props => {
	if (!props.tops) {
		props.fetchTops();
	}
	return <div>Hello</div>;
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
