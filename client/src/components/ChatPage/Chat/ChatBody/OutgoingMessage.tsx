import React from 'react';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { deleteMessage } from '../../ChatPage.redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface IProps {
	message: any; //todo
	deleteMessage: (id: string) => void;
}

const OutgoingMessage: React.FC<IProps> = ({ message, deleteMessage }) => {
	const onDelete = id => {
		deleteMessage(id);
	};
	return (
		<div className="outgoing-message">
			{message.body}
			<Moment format="H:mm" local>
				{message.created_at}
			</Moment>

			<div className="message-btns">
				<button onClick={() => onDelete(message.id)}>
					<FontAwesomeIcon icon={faTrashAlt} />
				</button>
				<button>
					<FontAwesomeIcon icon={faEdit} />
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props
});

const actions = {
	deleteMessage
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OutgoingMessage);
