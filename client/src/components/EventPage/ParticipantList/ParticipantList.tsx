import React, { useState, useEffect } from 'react';
import { IVisitor } from '../../UserPage/UserEvents/UserEvents.service';
import config from '../../../config';
import Image from '../../shared/Image/Image';
interface IProps {
	participants: IVisitor[];
	status: string;
}

const ParticipantList: React.FC<IProps> = ({ participants, status }) => {
	const [users, setUsers] = useState(participants);
	useEffect(() => {
		if (users !== participants) setUsers(participants);
	});

	const sortedParticipantsByStatus = participants.filter(
		participant => participant.status === status
	);

	if (sortedParticipantsByStatus.length === 0) {
		return <div className="no-participants">No one is {status}.</div>;
	}

	return (
		<div className="participant-list">
			{sortedParticipantsByStatus.map(participant => (
				<div key={participant.id}>
					<div className="participant-avatar">
						<Image src={participant.user.avatar} defaultSrc={config.DEFAULT_AVATAR} alt={participant.user.name} />
					</div>
					<div className="participant-name">{participant.user.name}</div>
				</div>
			))}
		</div>
	);
};

export default ParticipantList;
