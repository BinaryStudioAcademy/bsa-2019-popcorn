import React from 'react';
import './UserTops.scss';

import { isEqual } from 'lodash';
import Spinner from '../../shared/Spinner';
import CreateExtraBtn from "../../shared/CreateExtraBtn";
import TopItem from './TopItem/TopItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	uploadImage,
	fetchTops,
	addTop,
	updateTop,
	deleteTop
} from './UserTops.redux/actions';
import { ITopItem, convertServerDataFormatToClient } from './UserTops.service';

export interface IUserTopsState {
	topList: any;
	isCreated: boolean;
	isAction: boolean;
}
interface IUserTopProps {
	topList: ITopItem[];
	fetchTops: (userId: string) => any[];
	addTop: (newTop: any) => any;
	updateTop: (updatedTop: any) => any;
	deleteTop: (topId: string) => any;
	uploadImage: (data: FormData, topId: string) => void;
	userId: string;
	selectedUserId: string;
	isOwnData: boolean;
	uploadUrl: string;
	urlForTop: string;
	location?: {
		state?: {
			url_callback?: string;
		};
	};
	history?: {
		push: (path: string) => any;
	};
}

const newTop = (): ITopItem => {
	return {
		id: Date.now().toString(),
		title: '',
		moviesList: [],
		topImageUrl: '',
		isNewTop: true
	};
};

class UserTops extends React.Component<IUserTopProps, IUserTopsState> {
	static getDerivedStateFromProps(props, state) {
		if (state.isAction && !isEqual(props.topList, state.topList)) {
			return {
				...state,
				topList: convertServerDataFormatToClient(props.topList)
			};
		}
		return null;
	}

	constructor(props) {
		super(props);
		this.state = {
			topList: undefined,
			isCreated: false,
			isAction: true
		};
	}

	componentDidMount() {
		this.props.fetchTops(this.props.selectedUserId);
	}

	deleteTop = (top: ITopItem) => {
		if (top.isNewTop) {
			const topList = this.state.topList.filter(
				(topItem: ITopItem) => topItem.id !== top.id
			);
			this.setState({ topList, isCreated: false, isAction: false });
		} else {
			this.props.deleteTop(top.id);
			this.setState({ isCreated: false, isAction: true });
		}
	};

	createTop = () => {
		const { isCreated } = this.state;

		if (!isCreated) {
			const { topList } = this.state;

			this.setState({
				topList: [...topList, newTop()],
				isCreated: true,
				isAction: false
			});
		}
	};

	saveUserTop = (updatedTopItem: ITopItem) => {
		if (updatedTopItem.isNewTop) {
			const addedTop: any = Object.assign({}, updatedTopItem);
			addedTop.userId = this.props.userId;

			this.props.addTop(addedTop);
			this.setState({ isAction: true, isCreated: false });
		} else {
			const updatedTop: any = Object.assign({}, updatedTopItem);
			updatedTop.userId = this.props.userId;

			this.props.updateTop(updatedTop);
			this.setState({ isAction: true, isCreated: false });
		}
	};

	render() {
		const url_callback =
			this.props.location &&
			this.props.location.state &&
			this.props.location.state.url_callback;
		const redirect = () =>
			url_callback
				? this.props.history && this.props.history.push(url_callback)
				: null;

		const topList = this.state.topList;

		if (!topList) {
			return <Spinner />;
		}

		return (
			<div className="user-tops">
				{url_callback && (
					<button onClick={redirect} className={'btn'}>
						Back to story
					</button>
				)}
				{this.props.isOwnData && (
					<CreateExtraBtn
						handleClick={this.createTop}
						body={'Create top'}
					/>
				)}

				{topList.map((topItem: ITopItem) => (
					<TopItem
						key={topItem.id}
						saveUserTop={this.saveUserTop}
						topItem={topItem}
						isOwnData={this.props.isOwnData}
						deleteTop={this.deleteTop}
						uploadUrl={this.props.uploadUrl}
						urlForTop={this.props.urlForTop}
						uploadImage={this.props.uploadImage}
					/>
				))}
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id,
	uploadUrl: rootState.userTops.uploadUrl,
	urlForTop: rootState.userTops.urlForTop,
	topList: rootState.userTops.topList
});

const actions = {
	uploadImage,
	fetchTops,
	addTop,
	updateTop,
	deleteTop
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserTops);
