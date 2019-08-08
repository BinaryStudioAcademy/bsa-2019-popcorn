import React from "react";
import './AddComment.scss'

 interface IAddCommentProps{
     
}

class AddComment extends React.Component {
    constructor(props:IAddCommentProps) {
        super(props);
        this.state = {
            body: ''
        };
    }

    render() {
        return (
            <form className='comment-form'>
                <input className='comment-input' placeholder="Write something..."/>
                <button className='publish-button'>Publish</button>
            </form>
        )
    }
}

export default AddComment;