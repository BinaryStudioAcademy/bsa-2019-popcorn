import React from 'react';
import './RecommendItem.scss';
import { ReactComponent as SettingIcon } from '../../../assets/icons/general/settings.svg';
import { ReactComponent as LikeIcon } from '../../../assets/icons/general/likeIcon.svg';
import { ReactComponent as StaredIcon } from '../../../assets/icons/general/movie/staredIcon.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/general/plusIcon.svg';
import { ReactComponent as NotStaredIcon } from '../../../assets/icons/general/movie/notStaredIcon.svg';

type RecommendItemProps = {
	recommendItem: {
		image: string;
		name: string;
		date: string;
		rating: number;
	};
};

const RecommendItem = ({
	recommendItem: { image, name, date, rating }
}: RecommendItemProps) => {
	return (
		<div className="recommend-item">
			<div className="recommend-item-header">
				<div className="recommend-item-header-text">
					Added to&nbsp;<strong>Popular</strong>
				</div>
				<button className="recommend-item-settings">
					<SettingIcon width="13" height="4" />
				</button>
			</div>
			<div className="recommend-item-wrp">
				<img className="recommend-item-image" src={image} alt="event" />
			</div>
			<div className="recommend-item-info">
				<div className="recommend-item-row">
					<div className="recommend-item-name">{name}</div>
					<div className="recommend-item-percent">85%</div>
				</div>
				<div className="recommend-item-row">
					<div>
						<span className="recommend-item-date">
							{date}{' '}
							<svg
								width="2"
								height="11"
								viewBox="0 0 2 11"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M1 0V11" stroke="black" strokeOpacity="0.11" />
							</svg>
							Variety
						</span>
					</div>
					<div className="recommend-item-rating">
						<StaredIcon />
						<StaredIcon />
						<StaredIcon />
						<StaredIcon />
						<NotStaredIcon />
					</div>
				</div>
				<div className="recommend-item-row">
					<div className="recommend-item-action-buttons">
						<button>
							<LikeIcon width="1.5em" height="1.5em" />
						</button>
						<button>
							<PlusIcon width="1.5em" height="1.5em" />
						</button>
					</div>
					<div>
						<img
							className="recommend-item-reaction-image"
							src="https://pbs.twimg.com/profile_images/1088129693390385152/oYJSGsdq_400x400.jpg"
							alt="author"
						/>
						<img
							className="recommend-item-reaction-image"
							src="https://pbs.twimg.com/profile_images/1088129693390385152/oYJSGsdq_400x400.jpg"
							alt="author"
						/>
						<img
							className="recommend-item-reaction-image"
							src="https://pbs.twimg.com/profile_images/1088129693390385152/oYJSGsdq_400x400.jpg"
							alt="author"
						/>
						<img
							className="recommend-item-reaction-image"
							src="https://pbs.twimg.com/profile_images/1088129693390385152/oYJSGsdq_400x400.jpg"
							alt="author"
						/>
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
								+12
							</text>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecommendItem;
