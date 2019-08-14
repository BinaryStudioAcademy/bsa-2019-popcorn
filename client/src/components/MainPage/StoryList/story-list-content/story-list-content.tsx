import StoryListItem from '../story-list-item/story-list-item';
import React, { Component } from 'react';
import StoryVoting from '../../../StoryVoting/StoryVoting';

interface IStoryListItem {
	caption: string;
	image_url: string;
	user: {
		avatar: string;
		id: string;
		name: string;
		any;
	};
	any;
}

interface IStoryListItemsProps {
	storyListItems: Array<IStoryListItem>;
	openViewer: (number) => void;
}

class StoryListContent extends Component<IStoryListItemsProps> {
	constructor(props) {
		super(props);
	}

	render() {
		const { storyListItems } = this.props;
		const storyList = storyListItems.map((item, i) => {
			// if (item.type === 'event') {
			// 	return <StoryVoting header={} options={} deltaPositionForHeader={} deltaPositionForOptionBlock={} backColor={} userId={}
			// }

			return (
				<StoryListItem
					key={i}
					imageUrl={item.image_url}
					name={item.caption}
					avatar={item.user.avatar}
					openViewer={this.props.openViewer}
					index={i}
				/>
			);
		});
		return storyList;
	}
}

export default StoryListContent;
