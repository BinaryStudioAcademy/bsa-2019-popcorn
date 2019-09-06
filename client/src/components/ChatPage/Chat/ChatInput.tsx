import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createMessage, createChat } from '../ChatPage.redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { readMessages } from '../ChatPage.redux/actions';

interface IProps {
	createMessage: (userId: string, chatId: string, body: any) => void;
	createChat: (userId1: string, chatId2: string, newMessage: any) => void;
	chatId: string;
	userId: string;
	story?: any;
	createReaction: any;
	readMessages: (chatId: string, userId: string) => void;
}

const ChatInput: React.FC<IProps> = ({
	chatId,
	userId,
	createMessage,
	createChat,
	readMessages,
	story
}) => {
	const [message, changeMessage] = useState('');
	const handleKeyPress = e => {
		if (e.key === 'Enter') sendMessage();
	};

	const sendMessage = () => {
		if (message.trim() === '') return;
		changeMessage('');
		if (!chatId) {
			createChat(userId, story.userInfo.userId, {
				body: message,
				storyId: story && story.id
			});
			return;
		}
		createMessage(userId, chatId, {
			body: message,
			storyId: story && story.id
		});
	};

	const onInputClick = () => {
		readMessages(chatId, userId);
	};

	const onMessageChange = e => {
		changeMessage(e.target.value);
	};
	return (
		<div className="chat-input">
			<input
				type="text"
				placeholder="Write a message"
				onKeyPress={handleKeyPress}
				value={message}
				onChange={onMessageChange}
				onClick={onInputClick}
			/>
			<button onClick={sendMessage} className="send-btn">
				<FontAwesomeIcon icon={faPaperPlane} />
			</button>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id
});

const actions = {
	createMessage,
	createChat,
	readMessages
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatInput);
