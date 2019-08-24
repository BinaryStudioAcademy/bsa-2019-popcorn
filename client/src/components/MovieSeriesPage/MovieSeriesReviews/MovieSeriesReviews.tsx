import React, { SFC } from 'react';
import { connect } from 'react-redux';
import './MovieSeriesReviews.scss';
import ReviewItem from './ReviewItem/ReviewItem';
import Spinner from '../../shared/Spinner';
import { bindActionCreators } from 'redux';
import { fetchMovieReviews, setReaction } from './actions';

export interface IReview {
	id: string;
	user: {
		name: string;
		avatar: string;
		id: string;
	};
	analysis: string;
	movieId: string;
	text: string;
	created_at: string;
	reaction: IReviewReaction;
}

interface IReviewReaction {
	countLikes: number;
	countDislikes: number;
	userLike?: boolean;
}

interface IProps {
	reviews: IReview[];
	movieId: string;
	fetchMovieReviews: any;
	isLoaded: boolean;
	currentUserId: string;
	setReaction: (reviewId: string, isLike: boolean) => object;
}

class MovieSeriesReviews extends React.Component<IProps> {
	componentDidMount() {
		this.props.fetchMovieReviews(this.props.movieId);
	}

	render() {
		const { reviews, currentUserId, isLoaded, setReaction } = this.props;
		return (
			<div className="MovieSeriesReviews">
				{!isLoaded && !reviews ? (
					<Spinner />
				) : (
					<div>
						{!reviews.length ? (
							<div className="warning">No reviews yet</div>
						) : (
							reviews.map((item: IReview) => {
								return (
									<ReviewItem
										review={item}
										key={item.id}
										currentUserId={currentUserId}
										setReaction={setReaction}
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
	reviews: rootState.review.reviewList,
	isLoaded: rootState.review.isLoaded,
	movieId: rootState.movie.fetchedMovie.id,
	currentUserId: rootState.profile.profileInfo.id
});

const mapDispatchToProps = dispatch => {
	const actions = {
		fetchMovieReviews,
		setReaction
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieSeriesReviews);
