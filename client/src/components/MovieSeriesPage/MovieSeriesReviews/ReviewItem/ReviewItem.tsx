import React, { ReactElement } from 'react';
import './ReviewItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { IReview } from '../MovieSeriesReviews';

interface IProps {
	review: IReview;
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

	public render() {
		const { user, text, created_at } = this.props.review;

		const { showFullReview, textBlockHeight, isBigBlock } = this.state;

		return (
			<div className="review-wrapper">
				<div className="review-item">
					<div className="review-item-header">
						<div className="review-item-header-profile">
							<div className="profile-avatar">
								<img src={user.avatar} alt={`${user.name} photo`} />
							</div>
							<div className="profile-name-wrapper">
								<div className="profile-name">{user.name}</div>
							</div>
						</div>
						<div className="profile-review-date">{created_at}</div>
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
					{isBigBlock && this.renderReadMoreBtn(showFullReview)}
				</div>
			</div>
		);
	}
}

export default ReviewItem;
