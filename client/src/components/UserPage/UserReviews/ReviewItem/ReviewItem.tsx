import React from 'react';
import './ReviewItem.scss';
import Image from '../../../shared/Image/Image';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/general/closeIcon.svg';
import { IReview } from '../UserReviews';
import config from '../../../../config';
import ReviewAddModal from '../../../MovieSeriesPage/MovieSeriesReviews/ReviewAddModal/ReviewAddModal';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import {
	faThumbsDown as dislikeNoFill,
	faThumbsUp as likeNoFill
} from '@fortawesome/free-regular-svg-icons';

interface IProps {
	review: IReview;
	deleteReview: (reviewId: string) => object;
	setReview: any;
	removeReviewSet: any;
}

interface IState {
	showFullReview: boolean;
	textBlockHeight: string;
	isBigBlock: boolean;
	showModal: boolean;
}

class ReviewItem extends React.Component<IProps> {
	state: IState = {
		showFullReview: false,
		textBlockHeight: 'auto',
		isBigBlock: false,
		showModal: false
	};

	public divRef = React.createRef();

	componentDidMount() {
		const styles = getComputedStyle(this.divRef.current as any);
		const height = parseInt(styles.height as string);
		if (height > 90) {
			this.setState({
				...this.state,
				textBlockHeight: `not-auto`,
				isBigBlock: true
			});
		}
	}

	handleClickShowMore = () => {
		this.setState({
			...this.state,
			showFullReview: this.state.showFullReview ? false : true,
			textBlockHeight: this.state.showFullReview ? 'not-auto' : 'auto'
		});
	};

	renderReadMoreBtn = (showFullReview: boolean) => {
		return (
			<div className="read-more-btn" onClick={() => this.handleClickShowMore()}>
				{showFullReview ? 'read less' : 'read more'}
				<FontAwesomeIcon icon={showFullReview ? faChevronUp : faChevronDown} />
			</div>
		);
	};

	setModal = (isSetModal: boolean) => {
		this.setState({ ...this.state, showModal: isSetModal });
	};

	render() {
		const {
			movie: { poster_path, title, release_date, id: movieId },
			created_at,
			text,
			id: reviewId,
			movie,
			user: { id: userId },
			reaction: { userLike, countDislikes, countLikes }
		} = this.props.review;
		const { review, setReview, removeReviewSet } = this.props;
		const { deleteReview } = this.props;
		const {
			isBigBlock,
			showFullReview,
			textBlockHeight,
			showModal
		} = this.state;

		return (
			<div className="review-user-item-wrapper">
				{showModal && (
					<ReviewAddModal
						ownReview={review!}
						movie={movie}
						userId={userId}
						movieId={movieId}
						setModal={show => this.setModal(show)}
						setReview={setReview}
						removeReviewSet={removeReviewSet}
					/>
				)}
				<div className="review-user-item">
					<NavLink to={'/movie-series/' + movieId}>
						<div className="image-wrapper">
							<Image
								src={poster_path}
								defaultSrc={config.DEFAULT_MOVIE_IMAGE}
								alt="poster"
							/>
						</div>
					</NavLink>
					<div className="review-main">
						<div className="movie-title">
							<NavLink
								className="movie-title-nav-link"
								to={'/movie-series/' + movieId}
							>
								<div className="movie-title-name">
									{title}
									<span className="movie-title-date">
										{release_date
											? ' (' + release_date.slice(0, 4) + ')'
											: null}
									</span>
								</div>
							</NavLink>
							<div className="review-buttons">
								<button
									className="edit-button"
									onClick={() =>
										this.setState({ ...this.state, showModal: true })
									}
								>
									Edit
								</button>
								<button
									className="delete-button"
									onClick={() => deleteReview(reviewId)}
								>
									<CloseIcon className="delete-button-svg" />
								</button>
							</div>
						</div>
						<div className="review-date">
							<Moment format=" D MMMM YYYY" local>
								{String(created_at)}
							</Moment>
						</div>
						<div
							ref={this.divRef as any}
							className={`review-item-text ${
								isBigBlock ? 'review-item-text-big' : null
							} 
                ${showFullReview ? 'review-item-text-big-show-full' : null}`}
						>
							{text}
							{textBlockHeight !== 'auto' && !showFullReview ? (
								<div
									className="read-more-gradient"
									onClick={() => this.handleClickShowMore()}
								></div>
							) : null}
						</div>
						<div className="review-footer">
							<div className="review-reaction">
								<div className="review-likes">
									<span className="likes-icon">
										<FontAwesomeIcon
											className="like-no-fill"
											icon={likeNoFill}
										/>
									</span>
									<span className="likes-count">
										{countLikes == 0 ? null : countLikes}
									</span>
								</div>
								<div className="review-dislikes">
									<span className="dislikes-icon">
										<FontAwesomeIcon
											className="dislike-no-fill"
											icon={dislikeNoFill}
										/>
									</span>
									<span className="dislikes-count">
										{countDislikes == 0 ? null : countDislikes}
									</span>
								</div>
							</div>
							<div className="review-read-more">
								{isBigBlock && this.renderReadMoreBtn(showFullReview)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ReviewItem;
