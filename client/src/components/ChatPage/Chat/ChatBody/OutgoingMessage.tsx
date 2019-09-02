import React from 'react';
import Moment from 'react-moment';

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
		</div>
	);
};

export default OutgoingMessage;
