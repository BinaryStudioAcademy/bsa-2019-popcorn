import React from 'react';
import Spinner from '../../../shared/Spinner';
import './ReviewAddModal.scss';
import MovieItem from '../../../MovieList/MovieListItem/MovieListItem';

interface IProps {
	ownReview: any;
	setModal: (boolean) => any;
	movie: any;
}

interface IState {
	textArea: string;
	usePutRequest: boolean;
	showError: boolean;
}

class ReviewAddModal extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		const { textArea } = this.props.ownReview || '';
		this.state = {
			textArea,
			usePutRequest: !!textArea,
			showError: false
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
		const { textArea } = this.state;
		if (!textArea.trim()) {
			this.setState({ ...this.state, showError: true });
			return;
		}
	};

	render() {
		const { ownReview, movie, setModal } = this.props;

		return (
			<div className={'modal-wrp'}>
				<div className={'modal modal-story'}>
					{ownReview ? (
						<div className="modal-review">
							<div className="modal-title">
								Write your opinion about {movie.title}
							</div>
							<div className="movie-item-for-review">
								<MovieItem movie={movie} key={movie.id} />
							</div>
							<textarea
								value={this.state.textArea}
								onChange={e =>
									this.setState({ ...this.state, textArea: e.target.value })
								}
								className="review-text-area"
							></textarea>
							<div onClick={() => setModal(false)}>ЗАКРЫТЬ</div>
							<div onClick={() => this.onSubmitModal()}>ОТПРАВИТЬ</div>
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
