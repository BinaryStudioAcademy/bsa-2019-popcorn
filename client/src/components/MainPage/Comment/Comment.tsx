import React, { Component } from 'react';
import './Comment.scss';
import AddComment from '../../shared/AddComment/AddComment';
import IComment from '../Post/IComment';
import config from '../../../config';

type ICommentProps = {
	commentItem: IComment;
};

interface ICommentState {
	isCommentModalShown: boolean;
}

class Comment extends Component<ICommentProps, ICommentState> {
	constructor(props: ICommentProps) {
		super(props);
		this.state = {
			isCommentModalShown: false
		};
	}
	toggleCommentModal = () => {
		this.setState({ isCommentModalShown: !this.state.isCommentModalShown });
	};
	isCommentModalShown(id) {
		return this.state.isCommentModalShown ? <AddComment replyId={id} /> : null;
	}
	render() {
		const comment = this.props.commentItem;
		// const nestedComments = (comment.children || []).map(comment => {
		// 	return <Comment commentItem={comment} />;
		// });
		return (
			<div key={comment.id}>
				<div
					className={
						comment.parentId
							? 'comment-item comment-item-reply'
							: 'comment-item'
					}
				>
					<img
						className="post-item-avatar"
						src={(comment.user && comment.user.avatar) || config.DEFAULT_AVATAR}
						alt="author"
					/>
					<p className="comment-text">
						<strong>{comment.user.name}</strong>
						{comment.parentId && <i> {comment.parentId}, </i>} {comment.text}
					</p>
					<p className="comment-date">{comment.commentDate} </p>
					<button onClick={this.toggleCommentModal}>Reply</button>
					{this.isCommentModalShown(comment.id)}
				</div>
				{/*{nestedComments}*/}
			</div>
		);
	}
}

export default Comment;
