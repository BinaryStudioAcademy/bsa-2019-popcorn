import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	title: string;
	setExtra: (data: any) => any;
}

const Extra = (props: IProps) => {
	return (
		<div className="extra">
			<div>{props.title}</div>
			<div onClick={() => props.setExtra('')}>
				<FontAwesomeIcon icon={faTimesCircle} className={'fontAwesomeIcon'} />
			</div>
		</div>
	);
};

export default Extra;
