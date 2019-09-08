import StoryListItem from '../story-list-item/story-list-item';
import React, { Component } from 'react';
import StoryVoting from '../../../StoryVoting/StoryVoting';
import config from '../../../../config';

interface IStoryListItem {
	id: string;
	caption: string;
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

class StoryListContent extends Component<IStoryListItemsProps> {
	constructor(props) {
		super(props);
	}

	render() {
		const { storyListItems } = this.props;
		return storyListItems.map((item, i) => {
			if (item.type === 'voting' && item.voting) {
				const voting = item.voting;
				const avatar = item.user.avatar;
				// if (item.id === "2b032067-ba0b-4bfb-a2a2-e3da73e351ab") {
				//     console.log(item);
				// }
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
							id={item.id}
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
							image_url={item.image_url || voting.backImage || ''}
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
	}
}

export default StoryListContent;
