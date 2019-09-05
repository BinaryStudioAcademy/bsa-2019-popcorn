import React from 'react';
import { connect } from 'react-redux';
import OutgoingMessage from './OutgoingMessage';
import IncomingMessage from './IncomingMessage';
import BreakLine from './BreakLine';
import ScrollToBottom from 'react-scroll-to-bottom';
import { bindActionCreators } from 'redux';
import { readMessages } from '../../ChatPage.redux/actions';

interface IProps {
	messages: any;
	userId: string;
	chatId: string;
	readMessages: (chatId: string, userId: string) => void;
}

interface IState {
	chatId: string;
	messages: any;
}

class ChatBody extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			chatId: '',
			messages: []
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.chatId !== prevState.chatId) {
			nextProps.readMessages(nextProps.chatId, nextProps.userId);
			return {
				messages: nextProps.messages,
				chatId: nextProps.chatId
			};
		}
		return null;
	}
	render() {
		let tmpDate = '';
		const { messages, userId } = this.props;
		return (
			<ScrollToBottom className="chat-body" followButtonClassName="to-bottom">
				{messages.map((message, i) => {
					const date = new Date(message.created_at);
					const currentDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
					if (currentDate !== tmpDate) {
						tmpDate = currentDate;
						if (message.user.id === userId) {
							return (
								<div key={i} className="break-line-wrp">
									<BreakLine date={date} />
									<OutgoingMessage key={message.id} message={message} />
								</div>
							);
						} else {
							return (
								<div key={i} className="break-line-wrp">
									<BreakLine date={date} />
									<IncomingMessage key={message.id} message={message} />
								</div>
							);
						}
					} else {
						if (message.user.id === userId) {
							return <OutgoingMessage key={message.id} message={message} />;
						} else {
							return <IncomingMessage key={message.id} message={message} />;
						}
					}
				})}
			</ScrollToBottom>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id
});

const actions = {
	readMessages
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatBody);
