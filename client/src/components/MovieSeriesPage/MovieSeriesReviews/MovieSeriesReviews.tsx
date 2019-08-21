import React, { SFC } from 'react';
import { connect } from 'react-redux';
import './MovieSeriesReviews.scss';
import ReviewItem from './ReviewItem/ReviewItem';
import Spinner from '../../shared/Spinner';
import { bindActionCreators } from 'redux';
import { fetchMovieReviews } from './actions';

export interface IReview {
	id: string;
	user: {
		name: string;
		avatar: string;
		id: string;
	};
	text: string;
	created_at: string;
}

interface IProps {
	reviews: IReview[];
	movieId: string;
	fetchMovieReviews: any;
}

const MovieSeriesReviews: React.FC<IProps> = props => {
	const { reviews } = props;
	if (!reviews) {
		props.fetchMovieReviews(props.movieId);
		return <Spinner />;
	}
	return (
		<div className="MovieSeriesReviews">
			{!reviews ? (
				<Spinner />
			) : (
				<div>
					{!reviews.length ? (
						<div className="warning">No one Review</div>
					) : (
						reviews.map((item: IReview) => {
							return <ReviewItem review={item} key={item.id} />;
						})
					)}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	reviews: rootState.review.reviewList,
	movieId: rootState.movie.fetchedMovie.id
});

const mapDispatchToProps = dispatch => {
	const actions = {
		fetchMovieReviews
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieSeriesReviews);
