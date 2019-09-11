import React, { Component, createRef } from 'react';
import { ReactComponent as SendLogo } from '../../../assets/icons/general/messager/paper-plane.svg';
import SocketService from '../../../services/socket.service';
import './DiscussionComponent.scss';
import Moment from 'react-moment';
import config from '../../../config';
import { IDiscussionUser } from '../../UserPage/UserEvents/UserEvents.service';
import { NavLink } from 'react-router-dom';
export interface IDiscussionMessage {
	id: string;
	text: string;
	createdAt: string;
	user: IDiscussionUser;
}
interface IDiscussionProps {
	messages: IDiscussionMessage[];
	currentUser: IDiscussionUser;
	entityId: string;
	entityIdName: string;
}

interface IDiscussionState {
	messagesState: IDiscussionMessage[];
	inputIsEmpty: boolean;
	roomId: string;
}

class DiscussionComponent extends Component<
	IDiscussionProps,
	IDiscussionState
> {
	constructor(props: IDiscussionProps) {
		super(props);
		this.state = {
			messagesState: this.props.messages.sort(
				(m1, m2) => +new Date(m2.createdAt) - +new Date(m1.createdAt)
			),
			inputIsEmpty: true,
			roomId: String(props.entityIdName).concat(props.entityId)
		};
		this.addSocketEvents(this.addMessage, this.state.roomId);
	}
	private newMessage = createRef<HTMLTextAreaElement>();
	private discussionComponent = createRef<HTMLDivElement>();

	addSocketEvents = (addMessage, roomId) => {
		SocketService.join(`${roomId}`);
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
		if (!this.newMessage.current) {
			return;
		}
		const { currentUser, entityId, entityIdName } = this.props;
		const id = currentUser.id;
		const name = currentUser.name;
		const avatar = currentUser.avatar;
		const text = this.newMessage.current.value;

		const createdAt = this.getDateString();
		const dataMessage = {
			user: { id, name, avatar },
			text,
			createdAt,
			[entityIdName]: entityId,
			entityIdName
		};
		this.newMessage.current.value = '';
		this.newMessage.current.focus();
		this.setState({
			inputIsEmpty: true
		});
		if (dataMessage.text.trim()) {
			SocketService.emit('send-message-to-discussion', dataMessage);
			this.addMessage(dataMessage);
		}
	};

	addMessage = ({ user: { id, name, avatar }, text, createdAt }) => {
		const isMyMessage = id === this.props.currentUser.id;

		avatar = avatar || config.DEFAULT_AVATAR;
		let newMessageItem = {
			id: (Math.random() * (9000 - 1) + 1).toString(),
			text,
			createdAt,
			user: { id, name, avatar }
		};
		let arr = this.state.messagesState;
		arr.unshift(newMessageItem);
		this.setState(
			{
				messagesState: arr
			},
			isMyMessage ? () => this.scrollToTop() : undefined
		);
	};

	scrollToTop = () => {
		if (!this.discussionComponent.current) return;
		this.discussionComponent.current.scrollTop = 0;
	};

	componentWillUnmount() {
		SocketService.leave(this.state.roomId);
	}

	render() {
		const messages = this.state.messagesState;

		return (
			<div className="user-discussion-component" id="scroller">
				<div className="message-container" ref={this.discussionComponent}>
					{messages.map(message => {
						const isMyMessage = message.user.id === this.props.currentUser.id;
						return (
							<div
								className={`message-item ${isMyMessage &&
									'message-item-reverse'} `}
								key={message.id}
							>
								<NavLink to={'/user-page/' + message.user.id}>
									<img
										src={message.user.avatar || config.DEFAULT_AVATAR}
										alt="userPhoto"
									/>
								</NavLink>
								<div className="message-body">
									<div className="message-info">
										<div className="name">{message.user.name}</div>
										<div className="date">
											<Moment format=" D MMM HH:mm " local>
												{String(message.createdAt)}
											</Moment>
										</div>
									</div>
									<div className="body">{message.text}</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className="message-item new-message-item" tabIndex={0} id="anchor">
					<div className="message-body">
						<div className="new-message">
							<textarea
								className="new-message-input"
								wrap="soft"
								ref={this.newMessage}
								placeholder="Type a message"
								onChange={this.inputChange}
								onKeyPress={e => {
									if (e.key === 'Enter') this.sendMessage();
								}}
							/>
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
