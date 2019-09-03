import React from 'react';
import { NavLink } from 'react-router-dom';
import ChatListItem from './ChatListItem';
import SocketService from '../../../services/socket.service';
import {
	addMessage,
	deleteMessageStore,
	updateMessageStore
} from '../ChatPage.redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface IProps {
	chats: any; //todo
	addMessage: (any) => void;
	deleteMessageStore: (chatId, messageId) => void;
	updateMessageStore: (chatId, message) => void;
	unreadMessages: any;
	userId: string;
}
class ChatList extends React.Component<IProps> {
	componentDidMount() {
		const { chats } = this.props;
		if (Object.keys(chats).length > 0) {
			Object.keys(chats).forEach(SocketService.join);
			SocketService.on('new-message', this.props.addMessage);
			SocketService.on('delete-message', ({ chatId, messageId }) =>
				this.props.deleteMessageStore(chatId, messageId)
			);
			SocketService.on('update-message', ({ chatId, message }) =>
				this.props.updateMessageStore(chatId, message)
			);
		}
	}

	countUnreadMessages = chatId => {
		const { unreadMessages, userId } = this.props;
		const filteredUnreadMessages = unreadMessages.filter(
			message => message.chatId === chatId && message.user.id !== userId
		);
		return filteredUnreadMessages.length;
	};

	render() {
		const { chats } = this.props;
		return (
			<div>
				{Object.keys(chats).map(key => (
					<NavLink to={`/chat/${chats[key].id}`} key={chats[key].id}>
						<ChatListItem
							chat={chats[key]}
							unreadMessagesCount={this.countUnreadMessages(chats[key].id)}
						/>
					</NavLink>
				))}
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	unreadMessages: rootState.chat.unreadMessages,
	userId: rootState.profile.profileInfo.id
});

const actions = {
	addMessage,
	deleteMessageStore,
	updateMessageStore
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatList);
