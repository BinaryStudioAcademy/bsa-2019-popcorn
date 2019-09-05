import React from 'react';
import '../RecommendItemEvent.scss';
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
				<ReviewItem
					currentUserId={currUserId}
					review={review}
					setReaction={setReaction}
					isRecommended={true}
				/>
			</div>
		</div>
	);
};

export default RecommendItemReview;
