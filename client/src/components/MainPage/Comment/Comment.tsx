import React, { Component } from "react";
import "./Comment.scss"
import AddComment from "../../shared/AddComment/AddComment";

type ICommentProps = {
    commentItem:{
		id: string,
		author: string,
		commentDate: string,
		commentBody: string,
		parentId?: string
    }
}

interface ICommentState {
    isCommentModalShown: boolean,
};

class Comment extends Component<ICommentProps, ICommentState>{
	constructor(props:ICommentProps){
		super(props);
		 this.state = { 
            isCommentModalShown: false
		};
	}
	toggleCommentModal = () => {
        this.setState({ isCommentModalShown: !this.state.isCommentModalShown });
	}
	isCommentModalShown(id) {
        return this.state.isCommentModalShown ? 
            <AddComment parentId={id}/> :
            null;
    }
	render () {
	const { id, author, commentDate, commentBody, parentId } = this.props.commentItem;
	return (
		<div className="comment-item">
			<p><strong>{author}</strong> {commentBody}</p>
			<p className="comment-date">{commentDate} 	
				<button onClick={this.toggleCommentModal}>Reply</button>
				
			</p>
		{this.isCommentModalShown(id)}
		</div>
	);
	}
}
export default Comment;
