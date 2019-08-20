import React from 'react';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './StarRating.scss';

interface IProps {
	size: number;
	default: number;
	setUserRate: (newUserRate: any) => any;
	userRate: any;
}

interface IState {
	currentValue: number;
	showStarRate: boolean;
}

class StarRating extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			currentValue: this.props.default,
			showStarRate: false
		};
	}

	solidStar = (key: number, type: boolean): any => (
		<span
			className="star-container"
			onMouseOver={() =>
				this.setState({ ...this.state, currentValue: key + 1 })
			}
			onClick={() => {
				this.setState({ ...this.state, showStarRate: false });
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
		const count = [...(Array(5).keys() as any)];
		const result = count.map(element => {
			return element < this.state.currentValue
				? this.solidStar(element, true)
				: this.solidStar(element, false);
		});
		return result;
	}

	render() {
		const { rate } = this.props.userRate;
		return (
			<>
				<div
					className="stars-button"
					title={`Your rating: ${rate}`}
					onClick={() =>
						this.setState({
							...this.state,
							showStarRate: !this.state.showStarRate,
							currentValue: rate
						})
					}
				>
					<FontAwesomeIcon icon={faStarHalfAlt} />
				</div>

				<div
					className={`star-rating ${
						this.state.showStarRate ? 'show-rating' : 'hide-rating'
					}`}
				>
					{this.renderStars()}
				</div>
			</>
		);
	}
}

export default StarRating;
