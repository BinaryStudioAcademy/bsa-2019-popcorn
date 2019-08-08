import React, {Component, createRef} from 'react';
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
    constructor(props: IDiscussionProps) {
        super(props);
        this.state = {
            messagesState: this.props.messages,
            inputIsEmpty: true
        };
    };

    private newMessage = createRef<HTMLTextAreaElement>();
    private userPhoto = createRef<HTMLImageElement>();

    inputChange = () => {
        if (this.newMessage.current) {
            let checkInput = !this.newMessage.current.value.match(/^(?!\s*$).*/);
            this.setState({
                inputIsEmpty: checkInput
            });
        }
    };

    static getDateString(): string {
        let date = new Date();
        return [date.getFullYear(),
                DiscussionComponent.pad(date.getMonth() + 1),
                DiscussionComponent.pad(date.getDate())
            ].join('-') + ' ' +
            [DiscussionComponent.pad(date.getHours()),
                DiscussionComponent.pad(date.getMinutes()),
                DiscussionComponent.pad(date.getSeconds())].join(':');
    }

    static pad(n: number) {
        return n < 10 ? '0' + n : n;
    };

    addMessage = () => {
        if (this.newMessage.current && this.userPhoto.current) {
            let dateString = DiscussionComponent.getDateString();
            let newMessageItem = {
                id: (Math.random() * (9000 - 1) + 1).toString(),
                name: 'Me',
                photo: this.userPhoto.current.src,
                body: this.newMessage.current.value,
                date: dateString
            };
            this.newMessage.current.value = '';
            this.newMessage.current.focus();
            let arr = this.state.messagesState;
            arr.push(newMessageItem);
            this.setState({
                messagesState: arr,
                inputIsEmpty: true
            });
        }
    };

    render() {
        const messages = this.state.messagesState;
        return (
            <div style={{width: "100%", position: "relative", maxWidth: "100%"}}>
                <div className={"discussion-wrp"} id="scroller">
                    <div className={"MessageContainer UserDiscussionComponent"}>
                        {messages.map(message =>
                            <div className={"messageItem"} key={message.id}>
                                <img src={message.photo} alt={"userPhoto"}/>
                                <div className={"messageBody"}>
                                    <div className={"messageInfo"}>
                                        <div className={"name"}>{message.name}</div>
                                        <div className={"date"}>{message.date}</div>
                                    </div>
                                    <div className="body">{message.body}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={"messageItem newMessageItem"} id={"anchor"}>
                        <img src="https://img.icons8.com/wired/64/000000/user-male-circle.png" alt="userPhoto"
                             ref={this.userPhoto}/>
                        <div className={"messageBody"}>
                            <div className={"newMessage"}>
                            <textarea className="newMessageInput" wrap="off" ref={this.newMessage}
                                      placeholder="Type a message" onChange={this.inputChange}/>
                                <button onClick={this.addMessage} disabled={this.state.inputIsEmpty}
                                        className={"chat-btn"}>SEND
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DiscussionComponent;