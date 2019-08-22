import React from 'react';
import { connect } from 'react-redux';
import './UserReviews.scss';
import { fetchUserReviews } from './actions';
import { bindActionCreators } from 'redux';
import Spinner from '../../shared/Spinner';
import ReviewItem from '../../MovieSeriesPage/MovieSeriesReviews/ReviewItem/ReviewItem';

interface IProps {
	reviewUserList: any;
	fetchUserReviews: (userId: string) => object;
	currentUserId: string;
	loading: boolean;
}

class UserReviews extends React.Component<IProps> {
	componentDidMount() {
		this.props.fetchUserReviews(this.props.currentUserId);
	}

	render() {
		const { reviewUserList, currentUserId, loading } = this.props;
		console.log(this.props);
		return (
			<div className="MovieSeriesReviews">
				{loading ? (
					<Spinner />
				) : (
					<div>
						{!reviewUserList.length ? (
							<div className="warning">No one Review</div>
						) : (
							reviewUserList.map(item => {
								return (
									<ReviewItem
										review={item}
										key={item.id}
										currentUserId={currentUserId}
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
	fetchUserReviews
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserReviews);
