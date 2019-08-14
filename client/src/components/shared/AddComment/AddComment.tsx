import React from 'react';
import './AddComment.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';

interface IAddCommentProps {
	replyId?: string;
}

class AddComment extends React.Component<IAddCommentProps> {
	constructor(props: IAddCommentProps) {
		super(props);
		this.state = {
			body: ''
		};
	}

	render() {
		/*  UI: Change this.props.replyId to userName */
		return (
			<form
				className={
					this.props.replyId
						? 'comment-form comment-form-reply'
						: 'comment-form'
				}
			>
				<input
					className="comment-input"
					placeholder={
						this.props.replyId
							? `Reply to ${this.props.replyId}`
							: 'Write something...'
					}
				/>
				<button className="publish-button">
					<FontAwesomeIcon icon={faCommentAlt} />
				</button>
			</form>
		);
	}
}

export default AddComment;
