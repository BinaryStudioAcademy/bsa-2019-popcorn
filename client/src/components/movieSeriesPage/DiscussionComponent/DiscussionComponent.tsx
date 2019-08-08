import React, { Component, createRef } from 'react';
import { ReactComponent as SendLogo } from "../../../assets/icons/general/messager/paper-plane.svg";

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
    messagesState: {
        id: string,
        name: string,
        body: string,
        photo: string,
        date: string
    }[],
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
		if (this.newMessage.current){
			let checkInput = this.newMessage.current.value.match(/^(?!\s*$).*/) ? false : true;
			this.setState({
				inputIsEmpty: checkInput
			});
		}
	}
	getDateString():string {
		let date = new Date();
		return [date.getFullYear(),
			this.pad(date.getMonth()+1),
			this.pad(date.getDate())
			   ].join('-')+' '+
			  [this.pad(date.getHours()),
			   this.pad(date.getMinutes()),
			   this.pad(date.getSeconds())].join(':');
	}
	pad(n:number) {
		return n < 10 ? '0' + n : n;
	};
	addMessage = () => {
		if (this.newMessage.current && this.userPhoto.current){
			let dateString = this.getDateString();
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
				<div className="messageItem newMessageItem" tabIndex={0} id="anchor">
					<div className="messageBody">
						<div className="newMessage">
							<textarea className="newMessageInput" wrap="off" ref={this.newMessage} placeholder="Type a message" onChange={this.inputChange}></textarea>
							<button onClick={this.addMessage} disabled={this.state.inputIsEmpty}><SendLogo/></button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DiscussionComponent;