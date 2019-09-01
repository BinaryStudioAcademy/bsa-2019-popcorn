import React from 'react';
import { NavLink } from 'react-router-dom';
import ChatListItem from './ChatListItem';

interface IProps {
	chats: any; //todo
}

const ChatList: React.FC<IProps> = ({ chats }) => {
	return (
		<div>
			{Object.keys(chats).map(key => (
				<NavLink to={`/chat/${chats[key].id}`} key={chats[key].id}>
					<ChatListItem chat={chats[key]} />
				</NavLink>
			))}
		</div>
	);
};

export default ChatList;
