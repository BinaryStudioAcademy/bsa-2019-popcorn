import React from 'react';
import { NavLink } from 'react-router-dom';

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
			<NavLink to={`/user-page/${user.id}`}>
				<div className="user-name">{user.name}</div>
			</NavLink>
		</div>
	);
};

export default ChatHeader;
