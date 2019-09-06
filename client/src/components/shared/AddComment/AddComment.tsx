import React from 'react';
import './AddComment.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface IAddCommentProps {
	replyId?: string;
	createComment?: (text: string) => any;
}

class AddComment extends React.Component<IAddCommentProps, { body: string }> {
	constructor(props: IAddCommentProps) {
		super(props);
	}

	state = {
		body: ''
	};

	render() {
		/*  UI: Change this.props.replyId to userName */
		return (
			<div
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
					value={this.state.body}
					onChange={e => this.setState({ body: e.target.value })}
				/>
				<button
					className="publish-button"
					onClick={() => {
						if (!this.props.createComment) return;
						this.props.createComment(this.state.body);
						this.setState({ body: '' });
					}}
				>
					<FontAwesomeIcon icon={faPaperPlane} />
				</button>
			</div>
		);
	}
}

export default AddComment;
