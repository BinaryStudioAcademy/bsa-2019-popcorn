import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTimes,
	faTasks,
	faTrophy,
	faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import './Extra.scss';
interface IProps {
	link: string;
	data: any;
	type: string;
	clearExtra: (data: any) => any;
	readyPost?: boolean;
}
const Extra = (props: IProps) => {
	const getSurveyBody = data => {
		return (
			<>
				<div className="extra-title">
					<FontAwesomeIcon icon={faTasks} className="extra-icon" />
					<span>{data.title}</span>
				</div>
				{data.description && (
					<div className="extra-description">{data.description}</div>
				)}
			</>
		);
	};
	const getTopBody = data => {
		const movieForShow = [...data.movieInTop].slice(0, 3);
		return (
			<div>
				<div className="extra-title">
					<FontAwesomeIcon icon={faTrophy} className="extra-icon" />
					<span>{data.title}</span>
				</div>
				{data.movieInTop && (
					<div className="extra-description">
						{movieForShow.map((movieTop, i) => (
							<p key={movieTop.id} className="movie-top-item">
								{i + 1}. {movieTop.title}
							</p>
						))}
					</div>
				)}
			</div>
		);
	};
	const getEventBody = data => {
		return (
			<>
				<div className="event-date-range">
					<Moment format=" D MMM HH:mm " local>
						{String(data.start_date)}
					</Moment>
					{data.end_date && (
						<span>
							{' '}
							-
							<Moment format=" D MMM HH:mm " local>
								{String(data.end_date)}
							</Moment>
						</span>
					)}
				</div>
				<div className="extra-title">
					<FontAwesomeIcon icon={faCalendarAlt} className="extra-icon" />
					<span>{data.title}</span>
				</div>
				{data.description && (
					<div className="extra-description">{data.description}</div>
				)}
			</>
		);
	};
	const getExtraBody = (type, data) => {
		let res;
		switch (type) {
			case 'survey':
				res = getSurveyBody(data);
				break;
			case 'top':
				res = getTopBody(data);
				break;
			case 'event':
				res = getEventBody(data);
				break;
		}
		return res;
	};
	return (
		<div className="extra-list">
			<div className="extra-body">{getExtraBody(props.type, props.data)}</div>
			{!props.readyPost && (
				<p className="remove-extra" onClick={() => props.clearExtra('')}>
					<FontAwesomeIcon icon={faTimes} />
				</p>
			)}
		</div>
	);
};

export default Extra;
