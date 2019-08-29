import StoryListItem from '../story-list-item/story-list-item';
import React, { Component } from 'react';
import StoryVoting from '../../../StoryVoting/StoryVoting';
import config from '../../../../config';

interface IStoryListItem {
	id: string;
	caption: string;
	image_url: string;
	backgroundColor: string;
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
		image_url?: string;
	};
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
			if (item.type === 'voting' && item.voting) {
				const voting = item.voting;
				const avatar = item.user.avatar;
				return (
					<div
						key={item.id}
						className={'story-list-item-wrapper voting-wrp'}
						onClick={() => {
							this.props.openViewer(i);
						}}
					>
						<img
							alt="avatar"
							className="avatar avatar-story avatar-voting"
							src={avatar || config.DEFAULT_AVATAR}
						/>
						<StoryVoting
							backgroundColor={item.backgroundColor}
							header={voting.header}
							options={voting.options}
							deltaPositionForHeader={{
								x: voting.deltaPositionHeadX,
								y: voting.deltaPositionHeadY
							}}
							deltaPositionForOptionBlock={{
								x: voting.deltaPositionOptionBlockX,
								y: voting.deltaPositionOptionBlockY
							}}
							backColor={voting.backColor}
							userId={item.user.id}
							inEditor={false}
							image_url={voting.backImage || ''}
						/>
						<div className="story-name">{item.caption}</div>
					</div>
				);
			}

			return (
				<StoryListItem
					key={i}
					imageUrl={item.image_url}
					name={item.caption}
					backgroundColor={item.backgroundColor}
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
