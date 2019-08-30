import React, { Component } from 'react';
import './story-list-item.scss';
import config from '../../../../config';
interface IStoryListItemProps {
	name: string;
	imageUrl: string;
	avatar: string;
	index: number;
	backgroundColor: string;
	openViewer: (number) => void;
}

class StoryListItem extends Component<IStoryListItemProps> {
	render() {
		const { imageUrl, name, avatar, backgroundColor } = this.props;
		return (
			<div
				className="story-list-item-wrapper"
				onClick={() => {
					this.props.openViewer(this.props.index);
				}}
			>
				<div className="card" style={{ backgroundColor: backgroundColor }}>
					<img
						alt="avatar"
						className="avatar avatar-story"
						src={avatar || config.DEFAULT_AVATAR}
					/>
					{imageUrl && (
						<img alt="story-pic" className="story-pic" src={imageUrl} />
					)}
				</div>
				<div className="story-name">{name}</div>
			</div>
		);
	}
}

export default StoryListItem;
