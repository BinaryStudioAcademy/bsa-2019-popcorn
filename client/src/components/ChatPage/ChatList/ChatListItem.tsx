import React from 'react';
import Moment from 'react-moment';

interface IProps {
	chat: any; //todo
}

const ChatListItem: React.FC<IProps> = ({ chat }) => {
	return (
		<div className="chat-list-item">
			<img className="avatar" src={chat.user.avatar} alt="avatar" />
			<div className="chat-list-item-info">
				<div className="info-header">
					<div className="user-name">{chat.user.name}</div>
					<div className="last-date">
						<Moment format="D.MM.YY" local>
							{chat.lastMessage.created_at}
						</Moment>
					</div>
				</div>
				<div className="last-message">{chat.lastMessage.body}</div>
			</div>
		</div>
	);
};

export default ChatListItem;
