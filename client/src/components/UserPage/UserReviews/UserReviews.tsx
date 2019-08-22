import React from 'react';
import { connect } from 'react-redux';
import './UserReviews.scss';
import { fetchUserReviews } from './actions';
import { bindActionCreators } from 'redux';
import Spinner from '../../shared/Spinner';
import ReviewItem from './ReviewItem/ReviewItem';
import './UserReviews.scss';
import TMovie from '../../MovieSeriesPage/TMovie';

interface IProps {
	reviewUserList: IReview[];
	fetchUserReviews: (userId: string) => object;
	currentUserId: string;
	loading: boolean;
}

export interface IReview {
	id: string;
	text: string;
	created_at: Date;
	movie: TMovie;
	analysis: string;
	user: any;
}

class UserReviews extends React.Component<IProps> {
	componentDidMount() {
		this.props.fetchUserReviews(this.props.currentUserId);
	}

	render() {
		const { reviewUserList, currentUserId, loading } = this.props;
		console.log(reviewUserList);
		return (
			<div className="UserReviews">
				{loading ? (
					<Spinner />
				) : (
					<div>
						{!reviewUserList.length ? (
							<div className="warning">No one Review</div>
						) : (
							reviewUserList.map(item => {
								return <ReviewItem review={item} key={item.id} />;
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
	fetchUserReviews
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserReviews);
