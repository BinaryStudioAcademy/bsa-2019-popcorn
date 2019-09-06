import React from 'react';
import '../RecommendItem.scss';
import ReviewItem from '../../../MovieSeriesPage/MovieSeriesReviews/ReviewItem/ReviewItem';

type RecommendItemProps = {
	review: any;
	currUserId: string;
	setReaction: (reviewId: string, isLike: boolean) => object;
	movie: any;
};

const RecommendItemReview = ({
	review,
	currUserId,
	setReaction,
	movie
}: RecommendItemProps) => {
	return (
		<div className="recommend-item">
			<div className="recommend-item-header">
				<div className="recommend-item-header-text">
					<strong>Review</strong>
				</div>
			</div>
			<div style={{ height: 'auto' }} className="recommend-item-wrp">
				<ReviewItem
					currentUserId={currUserId}
					review={review}
					setReaction={setReaction}
					isRecommended={true}
					movie={movie}
				/>
			</div>
		</div>
	);
};

export default RecommendItemReview;
