import React from 'react';
import './ReviewItem.scss';
import Image from '../../../shared/Image/Image';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/general/closeIcon.svg';
import { IReview } from '../UserReviews';
import config from '../../../../config';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	review: IReview;
}

interface IState {
	showFullReview: boolean;
	textBlockHeight: string;
	isBigBlock: boolean;
}

class ReviewItem extends React.Component<IProps> {
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

	render() {
		const {
			movie: { poster_path, title, release_date },
			created_at,
			text
		} = this.props.review;
		const { isBigBlock, showFullReview, textBlockHeight } = this.state;
		console.log(this.props.review.movie);
		return (
			<div className="review-user-item-wrapper">
				<div className="review-user-item">
					<div className="image-wrapper">
						<Image
							src={poster_path}
							defaultSrc={config.DEFAULT_MOVIE_IMAGE}
							alt="poster"
						/>
					</div>
					<div className="review-main">
						<div className="movie-title">
							<div className="movie-title-name">
								{title}
								<span className="movie-title-date">
									{release_date ? ' (' + release_date.slice(0, 4) + ')' : null}
								</span>
							</div>
							<div className="review-buttons">
								<button className="edit-button">Edit</button>
								<button className="delete-button">
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
						{isBigBlock && this.renderReadMoreBtn(showFullReview)}
					</div>
				</div>
			</div>
		);
	}
}

export default ReviewItem;
