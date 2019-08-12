import React, { Component } from 'react';
import StoryListContent from '../story-list-content/story-list-content';
import AddStoryItem from '../add-story-item/add-story-item';
import StoryListSlider from '../story-list-slider/story-list-slider';
import AddStoryPopup from '../add-story-popup/add-story-popup';

import './story-list.scss';
import Spinner from '../../../shared/Spinner';
import config from '../../../../config';

interface IStoryListItem {
	caption: string;
	image_url: string;
	user: {
		avatar: string;
		any;
	};
	any;
}

interface IStoryListProps {
	scrollStep: number;
	stories: null | Array<IStoryListItem>;
	fetchStories: () => any;
	avatar: null | string;
}

interface IState {
	index: number;
	isPopupShown: boolean;
	scrollStep: number;
}

class StoryList extends Component<IStoryListProps, IState> {
	constructor(props) {
		super(props);

		this.state = {
			index: 0,
			isPopupShown: false,
			scrollStep: props.scrollStep || 1
		};
	}

	onOpenPopupClick = () => {
		this.setState({ isPopupShown: true });
	};

	onClosePopupClick = () => {
		this.setState({ isPopupShown: false });
	};

	scrollLeft = () => {
		if (!this.props.stories || this.props.stories.length === 0) return;
		const currentIndex = this.state.index;
		if (currentIndex - this.state.scrollStep < 0) {
			return;
		}

		this.setState({
			index: currentIndex - this.state.scrollStep
		});
	};

	scrollRight = () => {
		if (!this.props.stories || this.props.stories.length === 0) return;
		const currentIndex = this.state.index;
		if (currentIndex + this.state.scrollStep >= this.props.stories.length) {
			return;
		}

		this.setState({
			index: currentIndex + this.state.scrollStep
		});
	};

	getStoryRange = (
		storyListItems: null | Array<IStoryListItem>,
		index: number
	) => {
		return storyListItems ? storyListItems.slice(index, index + 9) : [];
	};

	render() {
		const { stories, fetchStories } = this.props;
		if (!stories) {
			fetchStories();
			return <Spinner />;
		}

		return (
			<div className="story-list-wrapper">
				<AddStoryPopup
					onClosePopupClick={this.onClosePopupClick}
					isShown={this.state.isPopupShown}
				/>
				<StoryListSlider
					scrollLeft={this.scrollLeft}
					scrollRight={this.scrollRight}
				/>
				<div className="story-list">
					<AddStoryItem
						onOpenPopupClick={this.onOpenPopupClick}
						avatar={this.props.avatar || config.DEFAULT_AVATAR}
					/>
					<StoryListContent
						storyListItems={this.getStoryRange(
							this.props.stories,
							this.state.index
						)}
					/>
				</div>
			</div>
		);
	}
}

export default StoryList;
