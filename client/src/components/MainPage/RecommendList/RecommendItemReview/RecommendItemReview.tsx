import React from 'react';
import '../RecommendItemEvent.scss';
import { NavLink } from 'react-router-dom';
import config from '../../../../config';
import ReviewItem from '../../../MovieSeriesPage/MovieSeriesReviews/ReviewItem/ReviewItem';

type RecommendItemProps = {
	review: any;
	currUserId: string;
	setReaction: (reviewId: string, isLike: boolean) => object;
};

const RecommendItemReview = ({
	review,
	currUserId,
	setReaction
}: RecommendItemProps) => {
	return (
		<div className="recommend-item">
			<div className="recommend-item-header">
				<div className="recommend-item-header-text">
					<strong>Review</strong>
				</div>
			</div>
			<div className="recommend-item-wrp">
				<img
					className="recommend-item-image"
					src={review.image ? review.image : config.DEFAULT_SURVEY_IMAGE}
					alt="event"
				/>
			</div>
			<div className="recommend-item-wrp">
				<ReviewItem
					currentUserId={currUserId}
					review={review}
					setReaction={setReaction}
				/>
			</div>
		</div>
	);
};

export default RecommendItemReview;
