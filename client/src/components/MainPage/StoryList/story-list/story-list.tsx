import React, { Component } from 'react';
import StoryListContent from '../story-list-content/story-list-content';
import AddStoryItem from '../add-story-item/add-story-item';
import './story-list.scss';
import './add-story-popup.scss';
import Spinner from '../../../shared/Spinner';
import config from '../../../../config';
import StoryViewer from '../../StoryViewer/StoryViewer';
import { Redirect } from 'react-router';
import SocketService from '../../../../services/socket.service';
import INewStory from '../INewStory';
import IVoting from '../IVoting';

interface IStoryListItem {
	caption: string;
	image_url: string;
	user: {
		avatar: string;
		id: string;
		name: string;
		any;
	};
	type: string;
	voting?: {
		backColor: string;
		backImage: string;
		deltaPositionHeadX: number;
		deltaPositionHeadY: number;
		deltaPositionOptionBlockX: number;
		deltaPositionOptionBlockY: number;
		header: string;
		id: string;
		options: Array<{
			body: string;
			voted: number;
		}>;
	};
}
interface IProps {
	scrollStep: number;
	stories: null | Array<IStoryListItem>;
	fetchStories: () => any;
	avatar: null | string;
	newStory: INewStory;
	cursorPosition: { start: number; end: number };
	setCaption: (caption: string) => any;
	top: { id: string; name: string; any };
	survey: { id: string; name: string; any };
	saveImage: (url: string) => any;
	changeActivity: (
		type: string,
		activity: { id: string; name: string } | null
	) => any;
	createStory: (newStory: INewStory, userId: string) => any;
	userId: string;
	createVoting: (voting: IVoting) => any;
	addStory: (story: any) => any;
}

interface IStoryListProps {
	scrollStep: number;
	stories: null | Array<IStoryListItem>;
	fetchStories: () => any;
	avatar: null | string;
}

interface IState {
	isPopupShown: boolean;
	scrollStep: number;
	isDown: boolean;
	startX: number;
	scrollLeft: number;
	isShownViewer: boolean;
	currentStory: number;
	class: string;
	modal: boolean;
}

class StoryList extends Component<IProps, IState> {
	updateModal: (value: boolean) => void;
	constructor(props) {
		super(props);

		this.state = {
			isPopupShown: false,
			scrollStep: props.scrollStep || 1,
			isDown: false,
			startX: 0,
			scrollLeft: 0,
			isShownViewer: false,
			currentStory: -1,
			class: '',
			modal: false
		};
		this.updateModal = this.handleUpdateModal.bind(this);
		this.addSocketEvents(props.addStory);
	}

	addSocketEvents = addStory => {
		SocketService.on('new-story', addStory);
	};

	handleUpdateModal = (value: boolean) => {
		this.setState({ isPopupShown: value });
	};

	onOpenPopupClick = () => {
		this.setState({ modal: true });
		// this.setState({ isPopupShown: true });
	};

	onClosePopupClick = () => {
		this.setState({ isPopupShown: false });
	};

	onMouseDown = event => {
		const scroll: any = this.refs.scroll;
		const startX = event.pageX - scroll.offsetLeft;
		const scrollLeft = scroll.scrollLeft;
		this.setState({ startX, scrollLeft, isDown: true });
	};

	onMouseLeave = () => {
		this.setState({ isDown: false, class: '' });
	};

	onMouseMove = event => {
		const { startX, scrollLeft, isDown } = this.state;
		const scroll: any = this.refs.scroll;
		if (!isDown) return;
		event.preventDefault();
		const x = event.pageX - scroll.offsetLeft;
		const walk = x - startX;
		scroll.scrollLeft = scrollLeft - walk;
		this.setState({ class: 'active' });
	};

	viewerIsShown = () => {
		const { stories } = this.props;
		if (!stories) return;
		if (!this.state.isShownViewer) return null;

		const { currentStory } = this.state;
		const mockStories = stories.map(story => ({
			...story,
			image_url: story.image_url,
			bckg_color: '#eedcff',
			users: [],
			userInfo: {
				userId: story.user.id,
				name: story.user.name,
				image_url: story.user.avatar
			},
			created_at: new Date(2019, 7, 13, 22)
		}));

		return (
			<StoryViewer
				stories={mockStories}
				currentUser={{ userId: '7f13634d-c353-433c-98fe-ead99e1252c7' }}
				currentStory={currentStory}
				closeViewer={this.closeViewer}
			/>
		);
	};

	closeViewer = () => {
		this.setState({
			currentStory: -1,
			isShownViewer: false
		});
	};

	openViewer = (id: number) => {
		this.setState({
			currentStory: id,
			isShownViewer: true
		});
	};

	render() {
		const { stories, fetchStories } = this.props;
		if (!stories) {
			fetchStories();
			return <Spinner />;
		}
		if (this.state.modal) {
			this.setState({ modal: false });
			return <Redirect to={'/create'} />;
		}

		return (
			<div className="story-list-wrapper">
				{this.viewerIsShown()}
				<div className="story-list">
					<AddStoryItem
						onOpenPopupClick={this.onOpenPopupClick}
						avatar={this.props.avatar || config.DEFAULT_AVATAR}
					/>
					<div
						ref="scroll"
						className={`story-list-scroll ${this.state.class}`}
						onMouseDown={this.onMouseDown}
						onMouseLeave={this.onMouseLeave}
						onMouseMove={this.onMouseMove}
						onClickCapture={event => {
							if (this.state.class === 'active') event.stopPropagation();
							this.setState({ isDown: false, class: '', isPopupShown: false });
						}}
					>
						<StoryListContent
							storyListItems={stories}
							openViewer={this.openViewer}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default StoryList;
