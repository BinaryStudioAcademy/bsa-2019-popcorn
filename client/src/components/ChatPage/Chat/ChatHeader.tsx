import React from 'react';

interface IProps {
	user: {
		id: string;
		name: string;
		avatar: string;
	};
}

const ChatHeader: React.FC<IProps> = ({ user }) => {
	return (
		<div className="chat-header">
			<img className="header-avatar" src={user.avatar} alt="avatar" />
			<div className="user-name">{user.name}</div>
		</div>
	);
};

export default ChatHeader;
