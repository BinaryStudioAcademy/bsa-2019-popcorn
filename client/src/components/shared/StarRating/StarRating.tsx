import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './StarRating.scss';

interface IProps {
	size: number;
	default: number;
	setUserRate: (newUserRate: any) => any;
	userRate: any;
	deleteUserRate: (userRate: any) => object;
}

interface IState {
	currentValue: number;
	showStarRate: boolean;
	hover: boolean;
}

class StarRating extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			currentValue: this.props.default,
			showStarRate: false,
			hover: false
		};
	}

	solidStar = (key: number, type: boolean): any => (
		<span
			key={key}
			onMouseEnter={() => {
				this.setState({ ...this.state, currentValue: key + 1 });
			}}
			onClick={() => {
				this.setState({
					...this.state,
					showStarRate: false,
					currentValue: key + 1
				});
				this.props.setUserRate({
					userId: this.props.userRate.userId,
					movieId: this.props.userRate.movieId,
					rate: this.state.currentValue
				});
			}}
		>
			<FontAwesomeIcon
				icon={faStar}
				className={type ? 'yellowStar' : 'greyStar'}
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
			showStarRate: !this.state.showStarRate,
			currentValue: this.props.userRate.rate
		});
	};

	render() {
		return (
			<div
				className="StarRating"
				onMouseEnter={() => this.setState({ ...this.state, hover: true })}
				onMouseLeave={() =>
					this.setState({
						...this.state,
						hover: false,
						currentValue: this.props.userRate.rate,
						showStarRate: false
					})
				}
			>
				<div
					className="star-user-rating-container"
					onClick={ev => this.onCLickToRate(ev)}
				>
					<FontAwesomeIcon icon={faStar} />
					<div className="user-rating-value">
						{this.state.currentValue ? (
							<span className="rating-value">
								{this.state.currentValue}
								<span className="label-you">you</span>
							</span>
						) : (
							<span className="label-rate-this">Rate this</span>
						)}
					</div>
				</div>
				{this.state.showStarRate && this.state.hover && (
					<div className="stars-container">
						<span
							onClick={ev => {
								ev.preventDefault();
								if (this.props.userRate.rate !== 0) {
									this.props.deleteUserRate(this.props.userRate);
								}
								this.setState({
									...this.state,
									currentValue: 0,
									showStarRate: false
								});
							}}
						>
							DELETE
						</span>
						{this.renderStars()}
					</div>
				)}
			</div>
		);
	}
}

export default StarRating;
