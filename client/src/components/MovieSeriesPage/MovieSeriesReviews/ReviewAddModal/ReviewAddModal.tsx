import React, { ObjectHTMLAttributes } from 'react';
import Spinner from '../../../shared/Spinner';
import './ReviewAddModal.scss';
import MovieItem from '../../../MovieList/MovieListItem/MovieListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface IProps {
	ownReview: any;
	movie: any;
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
}

class ReviewAddModal extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		const { ownReview } = this.props;
		const { text } = ownReview;
		this.state = {
			textArea: text || '',
			showError: false,
			usePut: !!text
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
	};

	onSubmitModal = () => {
		const { textArea, usePut } = this.state;
		const { movieId, userId, setReview, setModal } = this.props;
		if (!textArea.trim()) {
			this.setState({ ...this.state, showError: true });
			return;
		}
		if (usePut) {
			setReview(userId, movieId, textArea, this.props.ownReview.id);
		} else {
			setReview(userId, movieId, textArea);
		}
		setModal(false);
	};

	render() {
		const { ownReview, movie, setModal, removeReviewSet } = this.props;
		const { usePut, showError } = this.state;
		return (
			<div className={'modal-wrp'}>
				<div className={'modal modal-story'}>
					{ownReview ? (
						<div className="modal-review">
							<div className="modal-title">
								Write your opinion about <span>{movie.title}</span>
							</div>
							<div className="movie-item-for-review">
								<MovieItem movie={movie} key={movie.id} />
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
							></textarea>
							<div className="review-buttons">
								<div
									onClick={() => {
										setModal(false);
										removeReviewSet();
									}}
									className="close-button"
								>
									<FontAwesomeIcon icon={faTimes} />
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
