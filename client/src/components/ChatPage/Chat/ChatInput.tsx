import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createMessage } from '../ChatPage.redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	createMessage: (userId: string, chatId: string, body: any) => void;
	chatId: string;
	userId: string;
}

const ChatInput: React.FC<IProps> = ({ chatId, userId, createMessage }) => {
	const [message, changeMessage] = useState('');
	const handleKeyPress = e => {
		if (e.key === 'Enter') sendMessage();
	};

	const sendMessage = () => {
		if (message.trim() === '') return;
		changeMessage('');
		createMessage(userId, chatId, { body: message });
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
	createMessage
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatInput);
