import React from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
	chats: any; //todo
}

const ChatList: React.FC<IProps> = ({ chats }) => {
	return (
		<div>
			{Object.keys(chats).map(key => (
				<NavLink to={`/chat/${chats[key].id}`}>{chats[key].user.name}</NavLink>
			))}
		</div>
	);
};

export default ChatList;
