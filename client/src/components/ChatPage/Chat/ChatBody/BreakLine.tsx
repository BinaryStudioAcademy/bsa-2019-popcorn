import React from 'react';
import Moment from 'react-moment';

interface IProps {
	date: any;
}

const BreakLine: React.FC<IProps> = ({ date }) => {
	return <div className="break-line">{date}</div>;
};

export default BreakLine;
