import React from 'react';
import Moment from 'react-moment';
import MessageStory from './MessageStory';

interface IProps {
	message: any; //todo
}

const IncomingMessage: React.FC<IProps> = ({ message }) => {
	return (
		<div className="incoming-message">
			{message.story && (
				<MessageStory
					story={message.story}
					reactionType={message.reactionType}
					type="incoming"
				/>
			)}
			{message.body ? (
				<div className="incoming-message-text">
					{message.body}
					<Moment format="H:mm" local>
						{message.created_at}
					</Moment>
				</div>
			) : (
				<Moment format="H:mm" local>
					{message.created_at}
				</Moment>
			)}
		</div>
	);
};

export default IncomingMessage;
