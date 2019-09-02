import React from 'react';
import { NavLink } from 'react-router-dom';
import ChatListItem from './ChatListItem';
import SocketService from '../../../services/socket.service';
import { addMessage, deleteMessageStore } from '../ChatPage.redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface IProps {
	chats: any; //todo
	addMessage: (any) => void;
	deleteMessageStore: (chatId, messageId) => void;
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
		}
	}

	render() {
		const { chats } = this.props;
		return (
			<div>
				{Object.keys(chats).map(key => (
					<NavLink to={`/chat/${chats[key].id}`} key={chats[key].id}>
						<ChatListItem chat={chats[key]} />
					</NavLink>
				))}
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props
});

const actions = {
	addMessage,
	deleteMessageStore
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatList);
