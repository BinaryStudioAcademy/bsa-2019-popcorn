import React from 'react';

interface IProps {}

const ChatInput: React.FC<IProps> = () => {
	return (
		<div className="chat-input">
			<input type="text" placeholder="Write a message" />
		</div>
	);
};

export default ChatInput;
