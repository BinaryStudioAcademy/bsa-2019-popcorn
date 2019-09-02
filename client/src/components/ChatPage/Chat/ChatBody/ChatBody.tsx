import React from 'react';
import { connect } from 'react-redux';
import OutgoingMessage from './OutgoingMessage';
import IncomingMessage from './IncomingMessage';
import BreakLine from './BreakLine';
import ScrollToBottom from 'react-scroll-to-bottom';

interface IProps {
	messages: any; //todo
	userId: string;
}

const ChatBody: React.FC<IProps> = ({ messages, userId }) => {
	let tmpDate = '';
	return (
		<ScrollToBottom className="chat-body" followButtonClassName="to-bottom">
			{messages.map(message => {
				const date = new Date(message.created_at);
				const currentDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
				if (currentDate !== tmpDate) {
					tmpDate = currentDate;
					if (message.user.id === userId) {
						return (
							<div className="break-line-wrp">
								<BreakLine date={date} />
								<OutgoingMessage message={message} />
							</div>
						);
					} else {
						return (
							<div className="break-line-wrp">
								<BreakLine date={date} />
								<IncomingMessage message={message} />
							</div>
						);
					}
				} else {
					if (message.user.id === userId) {
						return <OutgoingMessage message={message} />;
					} else {
						return <IncomingMessage message={message} />;
					}
				}
			})}
		</ScrollToBottom>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id
});

export default connect(mapStateToProps)(ChatBody);
