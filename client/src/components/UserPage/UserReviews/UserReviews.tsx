import React from 'react';
import { connect } from 'react-redux';
import './UserReviews.scss';
import { fetchUserReviews, deleteReviewById } from './actions';
import {
	setReview,
	removeReviewSet
} from '../../MovieSeriesPage/Movie.redux/actions';
import { bindActionCreators } from 'redux';
import Spinner from '../../shared/Spinner';
import ReviewItem from './ReviewItem/ReviewItem';
import './UserReviews.scss';
import TMovie from '../../MovieSeriesPage/TMovie';

interface IProps {
	reviewUserList: IReview[];
	fetchUserReviews: (userId: string) => object;
	deleteReviewById: (reviewId: string) => object;
	currentUserId: string;
	selectedUserId: string;
	isOwnData: boolean;
	loading: boolean;
	setReview: any;
	removeReviewSet: any;
}

export interface IReview {
	id: string;
	text: string;
	created_at: Date;
	movie: TMovie;
	analysis: string;
	user: any;
	reaction: IReviewReaction;
}

interface IReviewReaction {
	userLike?: boolean;
	countLikes: number;
	countDislikes: number;
}

class UserReviews extends React.Component<IProps> {
	componentDidMount() {
		this.props.fetchUserReviews(this.props.selectedUserId);
	}

	render() {
		const {
			reviewUserList,
			loading,
			deleteReviewById,
			setReview,
			removeReviewSet,
			isOwnData
		} = this.props;

		return (
			<div className="UserReviews">
				{loading ? (
					<Spinner />
				) : (
					<div>
						{!reviewUserList.length ? (
							<div className="warning">No reviews yet</div>
						) : (
							reviewUserList.map(item => {
								return (
									<ReviewItem
										review={item}
										key={item.id}
										deleteReview={deleteReviewById}
										setReview={setReview}
										removeReviewSet={removeReviewSet}
										isOwnData={isOwnData}
									/>
								);
							})
						)}
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (rootState, props) => ({
	...props,
	currentUserId: rootState.profile.profileInfo.id,
	reviewUserList: rootState.review.reviewUserList,
	loading: rootState.review.loading
});

const actions = {
	fetchUserReviews,
	deleteReviewById,
	setReview,
	removeReviewSet
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserReviews);
