import React from 'react';
import io from 'socket.io-client';
import config from '../../config';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addStory } from './actions';

interface IProps {
	userId: string;
	addStory: (story: any) => any;
}

class Notifications extends React.Component<IProps> {
	socket;

	componentDidMount(): void {
		this.initSocket();
	}

	initSocket() {
		if (!this.socket) {
			this.socket = io(config.API_URL, { withCredentials: false });
			if (this.socket) {
				this.socket.on('connect', () => {
					this.addListenersToSocket(this.socket);
				});
			}
		}
	}

	addListenersToSocket(socket) {
		const { userId, addStory } = this.props;
		socket.emit('joinRoom', userId).on('new-story', addStory);
	}

	render() {
		return null;
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	userId: rootState.profile.profileInfo.id
});

const actions = {
	addStory
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Notifications);
