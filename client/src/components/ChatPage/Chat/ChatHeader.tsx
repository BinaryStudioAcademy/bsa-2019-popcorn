import React from 'react';
import { NavLink } from 'react-router-dom';
import Image from '../../shared/Image/Image';
import config from '../../../config';

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
			<Image
				className="header-avatar"
				src={user.avatar}
				defaultSrc={config.DEFAULT_AVATAR}
				alt="author"
			/>
			<NavLink to={`/user-page/${user.id}`}>
				<div className="user-name">{user.name}</div>
			</NavLink>
		</div>
	);
};

export default ChatHeader;
