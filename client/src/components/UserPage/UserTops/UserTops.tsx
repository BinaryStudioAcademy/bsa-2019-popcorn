import React from 'react';
import './UserTops.scss';

import TopItem from './TopItem/TopItem';
import { ITopItem } from './TopItem/TopItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadImage } from './actions';
export interface IUserTopsState {
	topList: ITopItem[];
}
interface IUserTopProps {
	uploadImage: (data: FormData, titleId: string) => void;
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

const topItemsMock: ITopItem[] = [
	{
		id: '1',
		title: 'My Top 1',
		topImageUrl: '',
		moviesList: [
			{ title: 'The Avengers', id: '1', comment: 'Nice' },
			{ title: 'Spider-Man', id: '2', comment: 'Nice' },
			{ title: 'Batman', id: '3', comment: 'Nice' }
		],
		isOwnTop: true
	},
	{
		id: '2',
		title: 'My Top 2',
		topImageUrl: '',
		moviesList: [
			{ title: 'The Avengers', id: '1', comment: 'Nice' },
			{ title: 'Spider-Man', id: '2', comment: 'Nice' },
			{ title: 'Batman', id: '3', comment: 'Nice' }
		],
		isOwnTop: true
	},
	{
		id: '3',
		title: 'My Top 3',
		topImageUrl: '',
		moviesList: [
			{ title: 'The Avengers', id: '1', comment: 'Nice' },
			{ title: 'Spider-Man', id: '2', comment: 'Nice' },
			{ title: 'Batman', id: '3', comment: 'Nice' }
		],
		isOwnTop: true
	},
	{
		id: '4',
		title: "Somebody's Top",
		topImageUrl: 'https://www.w3schools.com/images/colorpicker.gif',
		moviesList: [
			{ title: 'The Avengers', id: '1', comment: 'Nice' },
			{ title: 'Spider-Man', id: '2', comment: 'Nice' },
			{ title: 'Batman', id: '3', comment: 'Nice' }
		],
		isOwnTop: false
	}
];

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
			topList: topItemsMock
		};
	}
	deleteTop = (topId: string) => {
		const topList = this.state.topList.filter(
			(topItem: ITopItem) => topItem.id !== topId
		);
		this.setState({ topList });
	};

	createTop = () => {
		const { topList } = this.state;
		this.setState({ topList: [...topList, newTop()] });
	};

	saveUserTop = (updatedTopItem: ITopItem) => {
		const topList = this.state.topList.map(topItem =>
			topItem.id === updatedTopItem.id ? updatedTopItem : topItem
		);
		this.setState({ topList });
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
						((topItem.isOwnTop &&
							window.location.pathname == '/user-page/tops') ||
							window.location.pathname == '/movie-tops') && (
							<TopItem
								key={topItem.id}
								saveUserTop={this.saveUserTop}
								topItem={topItem}
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
	uploadUrl: rootState.userTops.uploadUrl,
	urlForTop: rootState.userTops.urlForTop
});

const actions = {
	uploadImage
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserTops);
