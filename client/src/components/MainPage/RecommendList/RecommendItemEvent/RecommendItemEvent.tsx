import React from 'react';
import '../RecommendItem.scss';
import Moment from 'react-moment';
import config from '../../../../config';
import Image from '../../../shared/Image/Image';

type RecommendItemProps = {
	event: {
		title: string;
		image: string;
		eventVisitors: any;
		dateRange: any;
	};
};

const RecommendItemEvent = ({ event }: RecommendItemProps) => {
	return (
		<div className="recommend-item">
			<div className="recommend-item-header">
				<div className="recommend-item-header-text">
					<strong>Event</strong>
				</div>
			</div>
			<div className="recommend-item-wrp">
				<Image
					className="recommend-item-image"
					src={event.image}
					defaultSrc={config.DEFAULT_EVENT_IMAGE}
					alt="event"
				/>
			</div>
			<div className="recommend-item-info">
				<div className="recommend-item-row">
					<div className="recommend-item-name">{event.title}</div>
				</div>
				<div className="recommend-item-row rating">
					<div>
						<span className="recommend-item-date">
							{console.log(event.dateRange.startDate)}
							<Moment format=" D MMM HH:mm " local={true}>
								{String(event.dateRange.startDate)}
							</Moment>{' '}
							<svg
								width="2"
								height="11"
								viewBox="0 0 2 11"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M1 0V11" stroke="black" strokeOpacity="0.11" />
							</svg>
							<Moment format=" D MMM HH:mm " local={true}>
								{String(event.dateRange.endDate)}
							</Moment>
						</span>
					</div>
				</div>
				<div className="recommend-item-row action">
					<div>
						{event.eventVisitors.map((el, index) => {
							if (index === event.eventVisitors.length - 1) {
								return (
									<svg
										className="recommend-item-reaction-image"
										width="2em"
										height="2em"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle cx="10" cy="10" r="10" fill="#FB8700" />
										<text style={{ fontSize: '8px' }} x="2" y="13" fill="white">
											+{event.eventVisitors.length - 4}
										</text>
									</svg>
								);
							}
							if (index > 3) {
								return;
							}
							return (
								<img
									className="recommend-item-reaction-image"
									src={el.user.avatar ? el.user.avatar : config.DEFAULT_AVATAR}
									alt="author"
									key={index}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecommendItemEvent;
