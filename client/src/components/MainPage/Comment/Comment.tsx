import React, { Component } from 'react';
import './Comment.scss';
import AddComment from '../../shared/AddComment/AddComment';
import IComment from '../Post/IComment';
import config from '../../../config';
import Image from '../../shared/Image/Image';
import { NavLink } from 'react-router-dom';

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
		return (
			<div key={comment.id}>
				<div
					className={
						comment.parentId
							? 'comment-item comment-item-reply'
							: 'comment-item'
					}

				>{comment.user && (
					<NavLink className="user-link" to={`/user-page/${comment.user.id}`}>
						<Image
							src={comment.user.avatar}
							className="post-item-avatar"
							defaultSrc={config.DEFAULT_AVATAR}
							alt="author"
						/>
					</NavLink>
				)}

					<p className="comment-text">
						<NavLink className="user-link" to={`/user-page/${comment.user.id}`}>
							<strong>{comment.user.name}</strong>
						</NavLink>
						{comment.parentId && <i> {comment.parentId}, </i>} {comment.text}
					</p>

					<p className="comment-date">{comment.commentDate} </p>
				</div >
			</div >
		);
	}
}

export default Comment;
