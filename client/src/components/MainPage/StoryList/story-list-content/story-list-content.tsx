import StoryListItem from '../story-list-item/story-list-item';
import React, { Component } from 'react';
import StoryVoting from '../../../StoryVoting/StoryVoting';
import config from '../../../../config';
import { isEqual, sortBy } from 'lodash';

interface IStoryListItem {
	id: string;
	caption: string;
	created_at: Date;
	image_url: string;
	backgroundColor: string;
	fontColor?: string;
	textPositionX?: number;
	textPositionY?: number;
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
	storyListItems: IStoryListItem[];
	openViewer: (number) => void;
}

interface IState {
	storyListItems: IStoryListItem[];
}

class StoryListContent extends Component<IStoryListItemsProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			storyListItems: []
		}
	}

	static getDerivedStateFromProps(props, state) {
		if (Array.isArray(props.storyListItems) && !isEqual(sortBy(props.storyListItems), sortBy(state.storyListItems)) ) {
			return {
				storyListItems: props.storyListItems
			}
		}
		return null;
	}

	render() {
		const { storyListItems } = this.state;
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
							backImage={item.image_url}
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
						{/* /	<div className="story-name">{item.caption}</div> */}
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
					fontColor={item.fontColor}
					textPositionX={item.textPositionX}
					textPositionY={item.textPositionY}
				/>
			);
		});
		return storyList;
	}
}

export default StoryListContent;
