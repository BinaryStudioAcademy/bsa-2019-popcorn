import React from 'react';
import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';

interface IProps {
	chat: any;
	unreadMessagesCount: any;
}

const ChatListItem: React.FC<IProps> = ({ chat, unreadMessagesCount }) => {
	return (
		<div className="chat-list-item">
			<img className="avatar" src={chat.user.avatar} alt="avatar" />
			<div className="chat-list-item-info">
				<div className="info-header">
					<NavLink to={`/user-page/${chat.user.id}`}>
						<div className="user-name">{chat.user.name}</div>
					</NavLink>
					{chat.lastMessage && (
						<div className="last-date">
							<Moment format="D.MM.YY" local>
								{chat.lastMessage.created_at}
							</Moment>
						</div>
					)}
				</div>
				{chat.lastMessage && (
					<div className="last-message">
						{chat.lastMessage.body}
						{unreadMessagesCount ? (
							<span className="counter">{unreadMessagesCount}</span>
						) : null}
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatListItem;
