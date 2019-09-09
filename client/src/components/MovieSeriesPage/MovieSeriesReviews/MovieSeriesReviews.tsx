import React from 'react';
import { connect } from 'react-redux';
import './MovieSeriesReviews.scss';
import ReviewItem from './ReviewItem/ReviewItem';
import Spinner from '../../shared/Spinner';
import { bindActionCreators } from 'redux';
import { fetchMovieReviews, setReaction } from './actions';
import ReviewAddModal from './ReviewAddModal/ReviewAddModal';

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
	errorWithReview?: string;
	ownReview: any;
	movie: any;
	setReview: any;
	userId: string;
	removeReviewSet: any;
	fetchReview: any;
}

interface IState {
	modal: boolean
}

class MovieSeriesReviews extends React.Component<IProps, IState> {
	constructor(props) {
		super(props)
		this.state = {
			modal: false
		}
	}
	componentDidMount() {
		this.props.fetchMovieReviews(this.props.movieId);
	}

	setModal = isOpen => {
		this.setState({
			modal: isOpen
		});
	}

	onModalClick = () => {
		this.setModal(true);
		this.props.fetchReview(this.props.userId, this.props.movieId);
	};

	render() {
		const {
			reviews,
			currentUserId,
			isLoaded,
			setReaction,
			errorWithReview,
			ownReview,
			movie,
			setReview,
			userId,
			removeReviewSet
		} = this.props;

		return (
			<div className="MovieSeriesReviews">
				{!isLoaded && !reviews ? (
					<Spinner />
				) : (
					<div>
						{this.state.modal && ownReview && (
							<ReviewAddModal
								ownReview={ownReview!}
								setModal={this.setModal}
								movie={movie}
								setReview={setReview}
								userId={userId}
								movieId={movie.id}
								removeReviewSet={removeReviewSet}
							/>
						)}
						<div className="create-item-button" onClick={this.onModalClick}>
							Write Review
						</div>
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
										errorWithReview={errorWithReview}
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
	errorWithReview: rootState.review.errorWithReview,
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
