import React, { Component } from 'react';
import './story-list-item.scss';
import config from '../../../../config';
import { connect } from 'react-redux';

interface IStoryListItemProps {
	name: string;
	imageUrl: string;
	avatar: string;
	index: number;
	backgroundColor: string;
	openViewer: (number) => void;
	fontColor: string;
	textPositionX?: number;
	textPositionY?: number;
	saveVotingReaction: (
		userId: string,
		votingId: string,
		optionId: string
	) => any;
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
				<div className="card" style={{ backgroundColor }}>
					<img
						alt="avatar"
						className="avatar avatar-story"
						src={avatar || config.DEFAULT_AVATAR}
					/>
					{imageUrl && (
						<img alt="story-pic" className="story-pic" src={imageUrl} />
					)}
				</div>
				<div
					className="story-name"
					style={{
						color: this.props.fontColor,
						top: this.props.textPositionY
							? this.props.textPositionY / 3 - 205 + 'px'
							: '-205px',
						left: this.props.textPositionX
							? this.props.textPositionX / 3 + 'px'
							: 0
					}}
				>
					{name}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props
	// fontColor: rootState.story.newStory.fontColor,
	// textPositionX: rootState.story.newStory.textPositionX,
	// textPositionY: rootState.story.newStory.textPositionY,
});

export default connect(mapStateToProps)(StoryListItem);
