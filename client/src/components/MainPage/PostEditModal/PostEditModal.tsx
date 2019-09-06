import React from 'react';
import './PostEditModal.scss';

interface IPostEditProps {
	isOwn: boolean;
	deletePost: () => void;
	editPost: () => any;
	toggleModal: () => any;
}

const PostEditModal = (props: IPostEditProps) => {
	return (
		<div className="post-modal-container">
			<div className="post-modal">
				<button>Copy link</button>
				{props.isOwn && (
					<button
						onClick={() => {
							props.editPost();
							props.toggleModal();
						}}
					>
						Edit
					</button>
				)}
				{props.isOwn && (
					<button
						className="delete"
						onClick={() => {
							props.deletePost();
							props.toggleModal();
						}}
					>
						Delete
					</button>
				)}
			</div>
		</div>
	);
};

export default PostEditModal;
