import React from 'react';
import {
	faStar as regularStar,
	faTimesCircle
} from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './StarRating.scss';

interface IProps {
	size: number;
	saveUserRate: (newUserRate: any) => any;
	userRate: any;
	deleteUserRate: (userRate: any) => object;
	currentUserId: string;
	movieId: string;
}

interface IState {
	currentValue: number;
	showStarRate: boolean;
	hover: boolean;
}

class StarRating extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		const { userRate } = this.props;
		const currentRate = userRate && userRate.rate;

		this.state = {
			currentValue: currentRate || 0,
			showStarRate: false,
			hover: false
		};
	}

	solidStar = (key: number, type: boolean): any => (
		<span
			key={key}
			className="star-item"
			onMouseEnter={() => {
				this.setState({ ...this.state, currentValue: key + 1 });
			}}
			title={`Click to rate: ${key + 1}`}
			onClick={() => {
				this.setState({
					...this.state,
					showStarRate: false,
					currentValue: key + 1
				});
				this.props.saveUserRate({
					userId: this.props.currentUserId,
					movieId: this.props.movieId,
					rate: this.state.currentValue
				});
			}}
		>
			<FontAwesomeIcon
				icon={type ? solidStar : regularStar}
				className="rating-star-color"
				key={key}
			/>
		</span>
	);

	renderStars() {
		const count = [...(Array(this.props.size).keys() as any)];
		const result = count.map(element => {
			return element < this.state.currentValue
				? this.solidStar(element, true)
				: this.solidStar(element, false);
		});
		return result;
	}

	onCLickToRate = ev => {
		ev.preventDefault();
		this.setState({
			...this.state,
			showStarRate: !this.state.showStarRate
		});
	};

	onMouseLeaveRateButton = () => {
		const { userRate } = this.props;
		const currentRate = userRate && userRate.rate;
		this.setState({
			...this.state,
			hover: false,
			currentValue: currentRate || 0,
			showStarRate: false
		});
	};

	onClickDeleteButton = ev => {
		ev.preventDefault();
		const { deleteUserRate, userRate } = this.props;
		if (userRate) {
			deleteUserRate(userRate);
		}
		this.setState({
			...this.state,
			currentValue: 0,
			showStarRate: false
		});
	};

	render() {
		const { hover, currentValue, showStarRate } = this.state;

		return (
			<div
				className="StarRating"
				onClick={ev => this.onCLickToRate(ev)}
				onMouseEnter={() => this.setState({ ...this.state, hover: true })}
				onMouseLeave={() => this.onMouseLeaveRateButton()}
			>
				<div className="star-user-rating-container">
					<FontAwesomeIcon
						className="star-icon"
						icon={currentValue ? solidStar : regularStar}
					/>
					<div className="user-rating-value">
						{currentValue ? (
							<span className="rating-value">
								{currentValue}
								<span className="label-you">Your rating</span>
							</span>
						) : (
							<span className="label-rate-this">Rate This</span>
						)}
					</div>
				</div>
				{showStarRate && hover && (
					<div className="stars-container">
						<span
							className="delete-button"
							title="Click to delete your rating"
							onMouseEnter={() => {
								this.setState({ ...this.state, currentValue: 0 });
							}}
							onClick={ev => this.onClickDeleteButton(ev)}
						>
							<FontAwesomeIcon icon={faTimesCircle} />
						</span>
						{this.renderStars()}
					</div>
				)}
			</div>
		);
	}
}

export default StarRating;
