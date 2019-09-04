import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createMessage } from '../../ChatPage/ChatPage.redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	createMessage: (userId: string, chatId: string, body: any) => void;
	chatId: string;
	userId: string;
	storyId: string;
}

const StoryReaction: React.FC<IProps> = ({
	chatId,
	userId,
	createMessage,
	storyId
}) => {
	const onReaction = reactionType => {
		createMessage(userId, chatId, { storyId, reactionType });
	};

	return (
		<div className="story-reactions">
			<div>
				<span onClick={() => onReaction('laugh')}>🤣</span>
				<span onClick={() => onReaction('stars')}>🤩</span>
				<span onClick={() => onReaction('cry')}>😢</span>
				<span onClick={() => onReaction('shock')}>😳</span>
			</div>
			<div>
				<span onClick={() => onReaction('fire')}>🔥</span>
				<span onClick={() => onReaction('angry')}>😡</span>
				<span onClick={() => onReaction('claps')}>👏🏻</span>
				<span onClick={() => onReaction('holiday')}>🥳</span>
			</div>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id
});

const actions = {
	createMessage
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StoryReaction);
