import React, { Component, createRef } from 'react';
import { ReactComponent as SendLogo } from '../../../assets/icons/general/messager/paper-plane.svg';
import SocketService from '../../../services/socket.service';
import './DiscussionComponent.scss';
import config from '../../../config';

interface IDiscussionProps {
	messages: {
		id: string;
		name: string;
		body: string;
		photo: string;
		date: string;
	}[];
	userInfo: {
		avatar?: string;
		userId: string;
		username: string;
	};
	movieId: string;
}

interface IDiscussionState {
	messagesState: {
		id: string;
		name: string;
		body: string;
		photo: string;
		date: string;
	}[];
	inputIsEmpty: boolean;
}

class DiscussionComponent extends Component<
	IDiscussionProps,
	IDiscussionState
> {
	constructor(props: IDiscussionProps) {
		super(props);
		this.state = {
			messagesState: this.props.messages,
			inputIsEmpty: true
		};
		this.addSocketEvents(this.addMessage, props.movieId);
	}
	private newMessage = createRef<HTMLTextAreaElement>();
	private userPhoto = createRef<HTMLImageElement>();
	private discussionComponent = createRef<HTMLDivElement>();

	addSocketEvents = (addMessage, movieId) => {
		SocketService.join(`${movieId}`);
		SocketService.on('add-message-to-discussion', addMessage);
	};

	inputChange = () => {
		if (this.newMessage.current) {
			let checkInput = this.newMessage.current.value.match(/^(?!\s*$).*/)
				? false
				: true;
			this.setState({
				inputIsEmpty: checkInput
			});
		}
	};
	getDateString(): string {
		let date = new Date();
		return (
			[
				date.getFullYear(),
				this.pad(date.getMonth() + 1),
				this.pad(date.getDate())
			].join('-') +
			' ' +
			[
				this.pad(date.getHours()),
				this.pad(date.getMinutes()),
				this.pad(date.getSeconds())
			].join(':')
		);
	}
	pad(n: number) {
		return n < 10 ? '0' + n : n;
	}

	sendMessage = () => {
		if (!this.newMessage.current) return;
		const { userInfo, movieId } = this.props;
		const userId = userInfo.userId;
		const name = userInfo.username;
		const photo = userInfo.avatar || config.DEFAULT_AVATAR;
		const body = this.newMessage.current.value;

		let date = this.getDateString();
		const dataMessage = {
			userInfo: { userId, name, photo },
			body,
			date,
			movieId
		};
		this.newMessage.current.value = '';
		this.newMessage.current.focus();
		this.setState({
			inputIsEmpty: true
		});
		SocketService.emit('send-message-to-discussion', dataMessage);
		this.addMessage(dataMessage);
	};

	addMessage = ({ userInfo: { userId, name, photo }, body, date }) => {
		const isMyMessage = userId === this.props.userInfo.userId;
		name = isMyMessage ? 'Me' : name;
		let newMessageItem = {
			id: (Math.random() * (9000 - 1) + 1).toString(),
			name,
			photo,
			body,
			date
		};
		let arr = this.state.messagesState;
		arr.push(newMessageItem);
		this.setState(
			{
				messagesState: arr
			},
			isMyMessage ? () => this.scrollToBottom() : undefined
		);
	};

	scrollToBottom = () => {
		if (!this.discussionComponent.current) return;
		const scrollHeight = this.discussionComponent.current.scrollHeight;
		const height = this.discussionComponent.current.clientHeight;
		const maxScrollTop = scrollHeight - height;
		this.discussionComponent.current.scrollTop =
			maxScrollTop > 0 ? maxScrollTop : 0;
	};

	componentWillUnmount() {
		SocketService.leave(this.props.movieId);
	}

	render() {
		const messages = this.state.messagesState;
		return (
			<div className="UserDiscussionComponent" id="scroller">
				<div className="MessageContainer" ref={this.discussionComponent}>
					{messages.map(message => (
						<div className="messageItem" key={message.id}>
							<img src={message.photo} alt="userPhoto" />
							<div className="messageBody">
								<div className="messageInfo">
									<div className="name">{message.name}</div>
									<div className="date">{message.date}</div>
								</div>
								<div className="body">{message.body}</div>
							</div>
						</div>
					))}
				</div>
				<div className="messageItem newMessageItem" tabIndex={0} id="anchor">
					<div className="messageBody">
						<div className="newMessage">
							<textarea
								className="newMessageInput"
								wrap="off"
								ref={this.newMessage}
								placeholder="Type a message"
								onChange={this.inputChange}
							></textarea>
							<button
								onClick={this.sendMessage}
								disabled={this.state.inputIsEmpty}
							>
								<SendLogo />
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DiscussionComponent;
