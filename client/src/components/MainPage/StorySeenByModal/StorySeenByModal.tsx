import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './StorySeenByModal.scss';

interface IProps {
	users: Array<{ name: string; image_url: string }>;
	closeModal: () => void;
}

const StorySeenByModal = (props: IProps) => {
	return (
		<div className="seen-by-modal-container">
			<div>
				<div className="seen-by-modal">
					<header>
						<p className="modal-header">Seen by</p>
						<p className="close-modal" onClick={props.closeModal}>
							<FontAwesomeIcon icon={faTimes} />
						</p>
					</header>
					<main>
						{props.users.map((user, i) => (
							<div className="seen-by-item" key={i}>
								<img src={user.image_url} alt="" />
								<span>{user.name}</span>
							</div>
						))}
					</main>
				</div>
			</div>
		</div>
	);
};

export default StorySeenByModal;
