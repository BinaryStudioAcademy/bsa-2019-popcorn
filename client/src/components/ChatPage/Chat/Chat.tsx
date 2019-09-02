import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMessages } from '../ChatPage.redux/actions';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody/ChatBody';
import ChatInput from './ChatInput';

interface IProps {
	match: {
		params: {
			id: string;
		};
	};
	fetchMessages: (userId: string, chatId: string) => void;
	chat: any; //todo
	userId: string;
	isLoadingMessages: boolean;
}

class Chat extends React.Component<IProps> {
	render() {
		if (!this.props.chat) {
			return <div>Loading...</div>;
		}
		if (!this.props.chat.messages && !this.props.isLoadingMessages) {
			this.props.fetchMessages(this.props.userId, this.props.match.params.id);
		}

		if (!this.props.chat.messages) return <div>Loading...</div>;
		return (
			<div>
				<ChatHeader user={this.props.chat.user} />
				<ChatBody messages={this.props.chat.messages} />
				<ChatInput />
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	chat: rootState.chat.chats[props.match.params.id],
	isLoadingMessages: rootState.chat.isLoadingMessages,
	userId: rootState.profile.profileInfo.id
});

const actions = {
	fetchMessages
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chat);
