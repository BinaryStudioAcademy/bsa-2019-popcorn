import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	createMessage,
	createChat
} from '../../ChatPage/ChatPage.redux/actions';
import { ReactComponent as LikeIcon } from '../../../assets/icons/reactions/like.svg';
import { ReactComponent as DislikeIcon } from '../../../assets/icons/reactions/dislike.svg';
import { ReactComponent as PopcornIcon } from '../../../assets/icons/reactions/popcorn.svg';
import { ReactComponent as AngryIcon } from '../../../assets/icons/reactions/angry.svg';
import { ReactComponent as HahaIcon } from '../../../assets/icons/reactions/haha.svg';
import { ReactComponent as WowIcon } from '../../../assets/icons/reactions/wow.svg';
import { ReactComponent as SadIcon } from '../../../assets/icons/reactions/sad.svg';
import { ReactComponent as FireIcon } from '../../../assets/icons/reactions/fire.svg';

interface IProps {
	createMessage: (userId: string, chatId: string, body: any) => void;
	chatId: string;
	userId: string;
	story: any;
	createChat: (userId1: string, chatId2: string, newMessage: any) => void;
}

const StoryReaction: React.FC<IProps> = ({
	chatId,
	userId,
	createMessage,
	createChat,
	story
}) => {
	const onReaction = reactionType => {
		if (!chatId) {
			createChat(userId, story.userInfo.userId, {
				storyId: story && story.id,
				reactionType
			});
			return;
		}
		createMessage(userId, chatId, { storyId: story.id, reactionType });
	};

	return (
		<div className="story-reactions">
			<div>
				<span onClick={() => onReaction('like')}>
					<LikeIcon />
				</span>
				<span onClick={() => onReaction('dislike')}>
					<DislikeIcon />
				</span>
				<span onClick={() => onReaction('popcorn')}>
					<PopcornIcon />
				</span>
				<span onClick={() => onReaction('haha')}>
					<HahaIcon />
				</span>
			</div>
			<div>
				<span onClick={() => onReaction('wow')}>
					<WowIcon />
				</span>
				<span onClick={() => onReaction('sad')}>
					<SadIcon />
				</span>
				<span onClick={() => onReaction('angry')}>
					<AngryIcon />
				</span>
				<span onClick={() => onReaction('fire')}>
					<FireIcon />
				</span>
			</div>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id
});

const actions = {
	createMessage,
	createChat
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StoryReaction);
