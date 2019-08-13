import StoryListItem from '../story-list-item/story-list-item';
import React, { Component } from 'react';

interface IStoryListItem {
	caption: string;
	image_url: string;
	user: {
		avatar: string;
		any;
	};
	any;
}

interface IStoryListItemsProps {
	storyListItems: Array<IStoryListItem>;
}

class StoryListContent extends Component<IStoryListItemsProps> {
	render() {
		const { storyListItems } = this.props;
		const storyList = storyListItems.map((item, i) => (
			<StoryListItem
				key={i}
				imageUrl={item.image_url}
				name={item.caption}
				avatar={item.user.avatar}
			/>
		));
		return storyList;
	}
}

export default StoryListContent;
