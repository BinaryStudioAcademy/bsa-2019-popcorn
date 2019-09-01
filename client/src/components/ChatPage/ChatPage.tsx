import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchChats } from './ChatPage.redux/actions';
import { Switch, Route } from 'react-router';
import Chat from './Chat';
import ChatList from './ChatList';

interface IProps {
	fetchChats: (userId) => void;
	chats: any; //to do
	userId: string;
	isLoadingList: boolean;
}

class ChatPage extends React.Component<IProps> {
	componentDidMount() {
		this.props.fetchChats(this.props.userId);
	}

	render() {
		if (this.props.isLoadingList) return <div>Loading...</div>;

		return (
			<div>
				<ChatList chats={this.props.chats} />

				<div>
					<Switch>
						<Route path={`/chat/:id`} component={Chat} />
					</Switch>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	chats: rootState.chat.chats,
	userId: rootState.profile.profileInfo.id,
	isLoadingList: rootState.chat.isLoadingList
});

const actions = {
	fetchChats
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatPage);
