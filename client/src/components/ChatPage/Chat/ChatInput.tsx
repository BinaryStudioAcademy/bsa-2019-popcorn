import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createMessage, createChat } from '../ChatPage.redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	createMessage: (userId: string, chatId: string, body: any) => void;
	createChat: (userId1: string, chatId2: string) => void;
	chatId: string;
	userId: string;
	story?: any;
}

const ChatInput: React.FC<IProps> = ({
	chatId,
	userId,
	createMessage,
	createChat,
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
			createChat(userId, story.userInfo.userId);
			return; // to do: pass callback on creating message
		}
		createMessage(userId, chatId, {
			body: message,
			storyId: story && story.id
		});
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
	createChat
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatInput);
