import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createMessage } from '../ChatPage.redux/actions';

interface IProps {
	createMessage: (userId: string, chatId: string, body: string) => void;
	chatId: string;
	userId: string;
}

const ChatInput: React.FC<IProps> = ({ chatId, userId, createMessage }) => {
	const [message, changeMessage] = useState('');
	const handleKeyPress = e => {
		if (e.key === 'Enter') sendMessage();
	};

	const sendMessage = () => {
		changeMessage('');
		createMessage(userId, chatId, message);
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
			<button onClick={sendMessage}>Send</button>
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
)(ChatInput);
