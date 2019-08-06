import React from 'react';
import './StoryViewerModal.scss';

interface IProps {
    isOwn: boolean,
    closeModal: () => void
}

const StoryViewerModal = (props: IProps) => {
    return (
        <div className="story-modal-container">
            <div className="story-modal">
                { 
                    !props.isOwn && <div>
                    <button>Reply</button>
                    </div> 
                }
                { 
                    props.isOwn && <div>
                        <button className="delete">Delete</button>
                        <button>Edit</button>
                    </div>
                }
                <button>Discuss</button>
                <button onClick={props.closeModal}>Close</button>
            </div>
        </div>
    )
};

export default StoryViewerModal;