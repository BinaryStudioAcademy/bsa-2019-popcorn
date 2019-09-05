import React from 'react';
import Moment from 'react-moment';

interface IProps {
	date: Date;
}

const BreakLine: React.FC<IProps> = ({ date }) => {
	return (
		<div className="break-line">
			<Moment format="D MMMM" local>
				{String(date)}
			</Moment>
		</div>
	);
};

export default BreakLine;
