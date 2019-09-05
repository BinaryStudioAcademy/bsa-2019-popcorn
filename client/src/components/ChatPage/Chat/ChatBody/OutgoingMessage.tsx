import React, { useState } from 'react';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { deleteMessage, updateMessage } from '../../ChatPage.redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-responsive-modal';
import MessageStory from './MessageStory';

interface IProps {
	message: any;
	deleteMessage: (id: string) => void;
	updateMessage: (id: string, body: { body: string }) => void;
}

const OutgoingMessage: React.FC<IProps> = ({
	message,
	deleteMessage,
	updateMessage
}) => {
	const onDelete = () => {
		deleteMessage(message.id);
	};
	const onToogleModal = () => {
		toggleModal(!isOpenModal);
	};
	const onUpdate = () => {
		updateMessage(message.id, { body: editedMessage });
		setEditedMessage('');
		toggleModal(false);
	};
	const [isOpenModal, toggleModal] = useState(false);
	const [editedMessage, setEditedMessage] = useState('');
	return (
		<div className="outgoing-message">
			{message.story && (
				<MessageStory
					story={message.story}
					reactionType={message.reactionType}
					type="outgoing"
				/>
			)}
			{message.body ? (
				<div className="outgoing-message-text">
					{message.body}
					<Moment format="H:mm" local>
						{message.created_at}
					</Moment>
					<div className="message-btns">
						<button onClick={onDelete}>
							<FontAwesomeIcon icon={faTrashAlt} />
						</button>
						<button onClick={onToogleModal}>
							<FontAwesomeIcon icon={faEdit} />
						</button>
					</div>

					<Modal
						open={isOpenModal}
						onClose={() => toggleModal(false)}
						showCloseIcon={true}
						focusTrapped={false}
						center
						classNames={{
							modal: 'edit-message-modal',
							closeButton: 'follow-modal-close'
						}}
					>
						<input
							type="text"
							value={editedMessage || message.body}
							onChange={e => setEditedMessage(e.target.value)}
						/>
						<button className="save-btn" onClick={onUpdate}>
							Edit
						</button>
					</Modal>
				</div>
			) : (
				<Moment format="H:mm" local>
					{message.created_at}
				</Moment>
			)}
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props
});

const actions = {
	deleteMessage,
	updateMessage
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OutgoingMessage);
