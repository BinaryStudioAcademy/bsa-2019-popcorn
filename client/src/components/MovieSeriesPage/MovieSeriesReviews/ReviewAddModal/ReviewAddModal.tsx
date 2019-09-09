import React, { ObjectHTMLAttributes } from 'react';
import Spinner from '../../../shared/Spinner';
import './ReviewAddModal.scss';
import MovieItem from '../../../MovieList/MovieListItem/MovieListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router';
import TMovie from '../../../MovieSeriesPage/TMovie';
import { ReactComponent as DurationIcon } from '../../../../assets/icons/general/movie/duration-icon.svg';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/general/closeIcon.svg';
import Image from '../../../shared/Image/Image';

import getFilmDuration from '../../../../helpers/getFilmDuration';
import config from '../../../../config';

interface IProps {
	ownReview: any;
	movie: TMovie;
	setModal: (boolean) => any;
	setReview: (
		userId: string,
		movieId: string,
		text: string,
		prevId?: string
	) => any;
	removeReviewSet: () => object;
	userId: string;
	movieId: string;
}

interface IState {
	textArea: string;
	showError: boolean;
	usePut: boolean;
	redirect: boolean;
}

class ReviewAddModal extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		const { ownReview } = this.props;
		const { text } = ownReview;
		this.state = {
			textArea: text || '',
			showError: false,
			usePut: !!text,
			redirect: false
		};
	}

	keydownHandler = (e: KeyboardEvent) => {
		if (e.keyCode === 13 && e.ctrlKey) this.onSubmitModal();
	};

	componentDidMount = () => {
		document.addEventListener('keydown', this.keydownHandler);
	};

	componentWillUnmount = () => {
		document.removeEventListener('keydown', this.keydownHandler);
		this.props.setModal(false);
	};

	onSubmitModal = () => {
		const { textArea, usePut } = this.state;
		const { movieId, userId, setReview } = this.props;
		if (!textArea.trim()) {
			this.setState({ ...this.state, showError: true });
			return;
		}
		if (usePut) {
			setReview(userId, movieId, textArea, this.props.ownReview.id);
		} else {
			setReview(userId, movieId, textArea);
		}
		this.setState({ ...this.state, redirect: true });
	};

	render() {
		const { ownReview, movie, setModal, removeReviewSet, movieId } = this.props;
		const { usePut, showError, redirect } = this.state;
		return (
			<div className={'modal-wrp'}>
				{redirect && <Redirect to={`/movies/${movieId}/reviews`} />}
				<div className={'modal modal-review-container'}>
					{ownReview ? (
						<div className="modal-review">
							<div className="modal-title">
								Write your opinion about <span>{movie.title}</span>
							</div>
							<div className="movie-review-body">
								<div className="movie-item-for-review">
									<Image
										className="movie-poster"
										src={movie.poster_path}
										defaultSrc={config.DEFAULT_MOVIE_IMAGE}
										alt="movie-poster"
									/>
									<div className="create-review-movie-title">{movie.title}</div>
									<div className="movie-secondary-info">
										<div className="create-review-duration">
											<DurationIcon className="create-review-duration-icon" />
											{getFilmDuration(movie.runtime)}
										</div>
										<div>
											<FontAwesomeIcon className="icon-star" icon={faStar} />
											{Number(movie.vote_average) ? movie.vote_average : 0}
										</div>
									</div>
								</div>
								<textarea
									autoFocus={true}
									value={this.state.textArea}
									onChange={e =>
										this.setState({
											...this.state,
											textArea: e.target.value,
											showError: false
										})
									}
									placeholder="Write here..."
									className="review-text-area"
								/>
							</div>
							<div className="review-buttons">
								<div
									onClick={() => {
										setModal(false);
										removeReviewSet();
									}}
									className="close-button"
								>
									<CloseIcon />
								</div>
								<div className="edit-button-wrapper">
									<div
										className="edit-button"
										onClick={() => this.onSubmitModal()}
									>
										{usePut ? 'edit' : 'send'}
									</div>
									{showError && <div className="error-message">Empty area</div>}
								</div>
							</div>
						</div>
					) : (
						<Spinner />
					)}
				</div>
			</div>
		);
	}
}

export default ReviewAddModal;
