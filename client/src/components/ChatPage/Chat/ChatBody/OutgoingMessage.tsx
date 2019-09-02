import React from 'react';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	message: any; //todo
}

const OutgoingMessage: React.FC<IProps> = ({ message }) => {
	return (
		<div className="outgoing-message">
			{message.body}
			<Moment format="H:mm" local>
				{message.created_at}
			</Moment>

			<div className="message-btns">
				<button className="send-btn">
					<FontAwesomeIcon icon={faTrashAlt} />
				</button>
				<button className="send-btn">
					<FontAwesomeIcon icon={faEdit} />
				</button>
			</div>
		</div>
	);
};

export default OutgoingMessage;
