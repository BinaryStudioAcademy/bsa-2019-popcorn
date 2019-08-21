import React from 'react';
import './UserTops.scss';

import { isEqual } from 'lodash';
import Spinner from '../../shared/Spinner';
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
import {
	ITopItem,
	convertServerDataFormatToClient
} from './UserTops.service';
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
	uploadImage: (data: FormData, titleId: string) => void;
	userId: string;
	userRole: string;
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

// add user info to each top
// const topItemsMock: ITopItem[] = [
// 	{
// 		id: '1',
// 		title: 'My Top 1',
// 		topImageUrl: '',
// 		moviesList: [
// 			{ title: 'The Avengers', id: '1', comment: 'Nice' },
// 			{ title: 'Spider-Man', id: '2', comment: 'Nice' },
// 			{ title: 'Batman', id: '3', comment: 'Nice' }
// 		],
// 		isOwnTop: true
// 	},
// 	{
// 		id: '2',
// 		title: 'My Top 2',
// 		topImageUrl: '',
// 		moviesList: [
// 			{ title: 'The Avengers', id: '1', comment: 'Nice' },
// 			{ title: 'Spider-Man', id: '2', comment: 'Nice' },
// 			{ title: 'Batman', id: '3', comment: 'Nice' }
// 		],
// 		isOwnTop: true
// 	},
// 	{
// 		id: '3',
// 		title: 'My Top 3',
// 		topImageUrl: '',
// 		moviesList: [
// 			{ title: 'The Avengers', id: '1', comment: 'Nice' },
// 			{ title: 'Spider-Man', id: '2', comment: 'Nice' },
// 			{ title: 'Batman', id: '3', comment: 'Nice' }
// 		],
// 		isOwnTop: true
// 	},
// 	{
// 		id: '4',
// 		title: "Somebody's Top",
// 		topImageUrl: 'https://www.w3schools.com/images/colorpicker.gif',
// 		moviesList: [
// 			{ title: 'The Avengers', id: '1', comment: 'Nice' },
// 			{ title: 'Spider-Man', id: '2', comment: 'Nice' },
// 			{ title: 'Batman', id: '3', comment: 'Nice' }
// 		],
// 		isOwnTop: false
// 	}
// ];

const newTop = (): ITopItem => {
	return {
		id: Date.now().toString(),
		title: '',
		moviesList: [],
		topImageUrl: '',
		isOwnTop: true,
		isNewTop: true
	};
};

class UserTops extends React.Component<IUserTopProps, IUserTopsState> {
	constructor(props) {
		super(props);
		this.state = {
			topList: undefined,
			isCreated: false,
			isAction: true
		};
	}

	componentDidMount() {
		this.props.fetchTops(this.props.userId);
	}

	static getDerivedStateFromProps(props, state) {
		if (
			state.isAction &&
			!isEqual(props.topList, state.topList)
			) {
			return {
				...state,
				topList: convertServerDataFormatToClient(props.topList)
			};
		}
		return null;
	}

	deleteTop = (top: ITopItem) => {
		// console.log(top.id);
		
		if (top.isNewTop) {
			const topList = this.state.topList
				.filter((topItem: ITopItem) => topItem.id !== top.id);	
			this.setState({ topList, isCreated: false, isAction: false });
		} else {
			this.props.deleteTop(top.id);
			this.setState({ isCreated: false, isAction: true });
		}
	};

	createTop = () => {
		const { isCreated } = this.state;
		// console.log(isCreated);
		
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
		// if (updatedTopItem.isNewTop) {
		// 	delete updatedTopItem.isNewTop;
		// }

		if (updatedTopItem.isNewTop) {
			// console.log('creating');

			// delete updatedTopItem.isNewTop;
			// delete updatedTopItem.isOwnTop;

			const addedTop: any = Object.assign({}, updatedTopItem);
			addedTop.userId = this.props.userId;

			this.props.addTop(addedTop);
			this.setState({ isAction: true });
		} else {
			// console.log('update');

			const updatedTop: any = Object.assign({}, updatedTopItem);
			updatedTop.userId = this.props.userId;

			this.props.updateTop(updatedTop);
			this.setState({ isAction: true });
		}

		// const topList = this.state.topList.map(topItem =>
		// 	topItem.id === updatedTopItem.id ? updatedTopItem : topItem
		// );

		// this.setState({ topList, isCreated: false });
	};

	isOwnTop(top) {
		const { userId, userRole } = this.props;
		if (top.user) {
			// delete this check when top will have user info
			return userRole === 'admin' || userId === top.user.userId;
		} else {
			return true;
		}
	}

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
		console.log(topList);
		
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
				<div className="create-top-button hover" onClick={this.createTop}>
					Create Top
				</div>
				{topList.map(
					(topItem: ITopItem) =>
						((this.isOwnTop(topItem) &&
							window.location.pathname ==
								'/user-page/' + this.props.userId + '/tops') ||
							window.location.pathname == '/movie-tops/') && (
							<TopItem
								key={topItem.id}
								saveUserTop={this.saveUserTop}
								topItem={topItem}
								isOwnTop={this.isOwnTop(topItem)}
								deleteTop={this.deleteTop}
								uploadUrl={this.props.uploadUrl}
								urlForTop={this.props.urlForTop}
								uploadImage={this.props.uploadImage}
							/>
						)
				)}
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id,
	userRole: rootState.profile.profileInfo.role,
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
