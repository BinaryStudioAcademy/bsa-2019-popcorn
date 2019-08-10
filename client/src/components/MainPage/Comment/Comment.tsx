import React, { Component } from "react";
import "./Comment.scss"

type ICommentProps = {
    commentItem:{
		id: string,
		author: string,
		commentDate: string,
		commentBody: string
    }
}

const Comment = ({ commentItem:{author, commentDate, commentBody} }: ICommentProps) => {
	return (
		<div className="comment-item">
			<p><strong>{author}</strong> {commentBody}</p>
			<p className="comment-date">{commentDate}</p>
		</div>
	);
}
export default Comment;
