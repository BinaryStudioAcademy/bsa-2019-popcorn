import React from 'react';
import { IVisitor } from '../../UserPage/UserEvents/UserEvents.service';
interface IProps {
	participants: IVisitor[];
}

const ParticipantList: React.FC<IProps> = ({ participants }) => {
	// console.log("users", users);
	return (
		<div className="participant-list">
			{participants.map(participant => (
				<div>
					<div className="participant-avatar">
						<img src={participant.user.avatar} alt="" />
					</div>
					<div className="participant-name">{participant.user.name}</div>
					<div className="participant-status">{participant.status}</div>
				</div>
			))}
		</div>
	);
};

export default ParticipantList;
