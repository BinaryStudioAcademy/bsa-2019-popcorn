import React, { Component, createRef } from 'react';
import "./DiscussionComponent.scss";

interface IDiscussionProps {
	messages: {
		id: string,
		name: string,
		body: string,
		photo: string,
		date: string
	}[]
}

interface IDiscussionState {
    messagesState:  {id: string,
		name: string,
		body: string,
		photo: string,
		date: string}[],
	inputIsEmpty: boolean
	
}

class DiscussionComponent extends Component<IDiscussionProps, IDiscussionState> {
	constructor(props:IDiscussionProps){
		super(props);
		this.state = {
			messagesState: this.props.messages,
			inputIsEmpty: true
		};
	  }
	private newMessage = createRef<HTMLTextAreaElement>();
	private userPhoto = createRef<HTMLImageElement>();
	inputChange = () => {
		if (this.newMessage.current && this.newMessage.current.value.match(/^(?!\s*$).*/)){
			this.setState({
				inputIsEmpty: false
			});
		} else {
			this.setState({
				inputIsEmpty: true
			});
		}
	}
	pad(n:number) {
		return n < 10 ? '0' + n : n;
	};
	addMessage = () => {
		if (this.newMessage.current && this.userPhoto.current){
			const date = new Date();
			let dateString = [date.getFullYear(),
				this.pad(date.getMonth()+1),
				this.pad(date.getDate())
               	].join('-')+' '+
              	[this.pad(date.getHours()),
               	this.pad(date.getMinutes()),
				   this.pad(date.getSeconds())].join(':');

			let newMessageItem = {
				id: (Math.random() * (9000 - 1) + 1).toString(),
				name: 'Me',
				photo: this.userPhoto.current.src,
				body: this.newMessage.current.value,
				date: dateString
			}
			this.newMessage.current.value = '';
			this.newMessage.current.focus();
			let arr = this.state.messagesState;
			arr.push(newMessageItem);
			this.setState({
				messagesState: arr,
				inputIsEmpty: true
			});
		}
	}
	render(){
		const  messages  = this.state.messagesState;
		return (
			<div className="UserDiscussionComponent" id="scroller">
				<div className="MessageContainer">
				{messages.map(message =>
					<div className="messageItem" key={message.id}>
						<img src={message.photo} alt="userPhoto"/>
						<div className="messageBody">
							<div className="messageInfo">
								<div className="name">{message.name}</div>
								<div className="date">{message.date}</div>
							</div>
							<div className="body">{message.body}</div>
						</div>
					</div>
				)}
				</div>
				<div className="messageItem newMessageItem" id="anchor">
					<img src="https://img.icons8.com/wired/64/000000/user-male-circle.png" alt="userPhoto" ref={this.userPhoto}/>
					<div className="messageBody">
						<div className="newMessage">
							<textarea className="newMessageInput" wrap="off" ref={this.newMessage} placeholder="Type a message" onChange={this.inputChange}></textarea>
							<button onClick={this.addMessage} disabled={this.state.inputIsEmpty}>SEND</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DiscussionComponent;