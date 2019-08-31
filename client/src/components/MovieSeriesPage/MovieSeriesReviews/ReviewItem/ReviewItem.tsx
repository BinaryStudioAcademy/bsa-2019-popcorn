import React, { ReactElement } from 'react';
import './ReviewItem.scss';
import { IReview } from '../MovieSeriesReviews';
import Moment from 'react-moment';
import Image from '../../../shared/Image/Image';
import config from '../../../../config';
import { analysisToGRBA } from '../../../../helpers/analysisToGRBA';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronDown,
	faChevronUp,
	faThumbsDown as dislikeFill,
	faThumbsUp as likeFill
} from '@fortawesome/free-solid-svg-icons';
import {
	faThumbsDown as dislikeNoFill,
	faThumbsUp as likeNoFill
} from '@fortawesome/free-regular-svg-icons';

interface IProps {
	review: IReview;
	currentUserId: string;
	setReaction: (reviewId: string, isLike: boolean) => object;
	errorWithReview?: string;
}

interface IState {
	showFullReview: boolean;
	textBlockHeight: string;
	isBigBlock: boolean;
}

class ReviewItem extends React.Component<IProps, IState> {
	state: IState = {
		showFullReview: false,
		textBlockHeight: 'auto',
		isBigBlock: false
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

	sendReactionToAction = (isLike: boolean) => {
		const {
			setReaction,
			review: {
				id: reviewId,
				user: { id: userId }
			},
			currentUserId
		} = this.props;
		if (userId === currentUserId) return;
		setReaction(reviewId, isLike);
	};

	public render() {
		const {
			review: {
				id: reviewId,
				user,
				text,
				created_at,
				analysis,
				reaction: { countDislikes, countLikes, userLike },
				user: { id: userId }
			},
			currentUserId,
			errorWithReview
		} = this.props;
		const { showFullReview, textBlockHeight, isBigBlock } = this.state;

		const analysisRBGA = analysisToGRBA(analysis);

		return (
			<div className="review-wrapper" style={{ backgroundColor: analysisRBGA }}>
				<div className="review-item">
					<div className="review-item-header">
						<div className="review-item-header-profile">
							<div className="profile-avatar">
								<Image
									src={user.avatar}
									alt={user.name}
									defaultSrc={config.DEFAULT_AVATAR}
								/>
							</div>
							<div className="profile-name-wrapper">
								<div className="profile-name">
									{user.id === currentUserId ? 'You' : user.name}
								</div>
								<div className="profile-review-date">
									<Moment format=" D MMM HH:mm " local>
										{String(created_at)}
									</Moment>
								</div>
							</div>
						</div>
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
								<span
									onClick={() => this.sendReactionToAction(true)}
									className={`likes-icon ${
										currentUserId === userId ? 'block-button' : null
									}`}
								>
									{userLike === true ? (
										<FontAwesomeIcon className="like-fill" icon={likeFill} />
									) : (
										<FontAwesomeIcon
											className="like-no-fill"
											icon={likeNoFill}
										/>
									)}
								</span>
								<span className="likes-count">
									{countLikes == 0 ? null : countLikes}
								</span>
							</div>
							<div className="review-dislikes">
								<span
									onClick={() => this.sendReactionToAction(false)}
									className={`dislikes-icon ${
										currentUserId === userId ? 'block-button' : null
									}`}
								>
									{userLike === false ? (
										<FontAwesomeIcon
											className="dislike-fill"
											icon={dislikeFill}
										/>
									) : (
										<FontAwesomeIcon
											className="dislike-no-fill"
											icon={dislikeNoFill}
										/>
									)}
								</span>
								<span className="dislikes-count">
									{countDislikes == 0 ? null : countDislikes}
								</span>
							</div>
							<span className="error-block">
								{errorWithReview === reviewId ? 'error... try again' : null}
							</span>
						</div>
						<div className="review-read-more">
							{isBigBlock && this.renderReadMoreBtn(showFullReview)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ReviewItem;
