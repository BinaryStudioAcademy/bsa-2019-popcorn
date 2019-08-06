import React, { Component, createRef } from 'react';
import "./DiscussionComponent.scss";

interface IDiscussionProps {
	messages: {id: string,
		name: string,
		body: string,
		photo: string,
		date: string}[];
}

interface IState {
    messagesState:  {id: string,
		name: string,
		body: string,
		photo: string,
		date: string}[];
	
}

/* mock props
**
		const messages = 
		[{
			id: '1',
			name: 'Morris',
			body: 'Nice to see you',
			photo: 'https://img.icons8.com/dusk/64/000000/circled-user-male-skin-type-6.png',
			date: '08.12.2017 12:35'
		}];

*/

class DiscussionComponent extends Component<IDiscussionProps, IState> {
	// static defaultProps: IDiscussionProps = {
    //     messages: []
	// }
	// state:IState = {
    //     messagesState: this.props.messages
    // }
	constructor(props:IDiscussionProps){
		super(props);
		this.state = { messagesState: this.props.messages };
	  }
	private newMessage = createRef<HTMLTextAreaElement>();
	private userName = createRef<HTMLDivElement>();
	private userPhoto = createRef<HTMLImageElement>();
	pad(n:any) {
		return n < 10 ? '0' + n : n;
	};
	addMessage = () => {
		if (this.userName.current && this.newMessage.current && this.userPhoto.current){
			const date = new Date;
			let dateString = [date.getFullYear(),
				this.pad(date.getMonth()+1),
				this.pad(date.getDate())
               	].join('-')+' '+
              	[this.pad(date.getHours()),
               	this.pad(date.getMinutes()),
				   this.pad(date.getSeconds())].join(':');

			let newMessageItem = {
				id: (Math.random() * (9000 - 1) + 1).toString(),
				name: this.userName.current.textContent ? this.userName.current.textContent : 's',
				photo: this.userPhoto.current.src,
				body: this.newMessage.current.value,
				date: dateString
			}
			this.newMessage.current.value = '';
			this.newMessage.current.focus();
			let arr = this.state.messagesState;
			arr.push(newMessageItem);
			this.setState({
				messagesState: arr
			});
		}
		
	}
	render(){
		const  messages  = this.state.messagesState;
		return (
			<div className="UserDiscussionComponent">
				<h1>Chat Discussion</h1>
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
				<div className="messageItem newMessageItem">
						<img src="https://img.icons8.com/wired/64/000000/user-male-circle.png" alt="userPhoto" ref={this.userPhoto}/>
						<div className="messageBody">
							<div className="messageInfo">
								<div className="name" ref={this.userName}>Me</div>
								<div className="date">Now</div>
							</div>
							<div className="newMessage">
								<textarea className="newMessageInput" wrap="off" ref={this.newMessage} placeholder="Type a message"></textarea>
								<button onClick={this.addMessage}>SEND</button>
							</div>
						</div>
					</div>
			</div>
		);
	}
}

export default DiscussionComponent;