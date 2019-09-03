import React from 'react';
import './PostEditModal.scss';

interface IPostEditProps {
	isOwn: boolean;
	deletePost: (any) => void;
	editPost: () => any;
}

const PostEditModal = (props: IPostEditProps) => {
	return (
		<div className="post-modal-container">
			<div className="post-modal">
				<button>Copy link</button>
				{props.isOwn && <button onClick={props.editPost}>Edit</button>}
				{props.isOwn && (
					<button className="delete" onClick={props.deletePost}>
						Delete
					</button>
				)}
			</div>
		</div>
	);
};

export default PostEditModal;
