import React from 'react';
import './PostEditModal.scss';

interface IPostEditProps {
    isOwn: boolean,
}

const PostEditModal = (props: IPostEditProps) => {
    return (
        <div className="post-modal-container">
            <div className="post-modal">
                <button>Copy link</button>
				{ props.isOwn && <button>Edit</button> }
                { props.isOwn && <button className="delete">Delete</button> }
            </div>
        </div>
    )
};

export default PostEditModal;