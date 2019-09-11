import React, { Component } from 'react';
import AwardItem from './AwardItem/AwardItem';
import './MovieSeriesAwards.scss';
import Spinner from '../../shared/Spinner';

interface IMovieSeriesAwardsProps {
	fetchAwards: (id: any) => any;
	imdbId: string;
	awards: any;
}

class MovieSeriesAwards extends Component<IMovieSeriesAwardsProps, {}> {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchAwards(this.props.imdbId);
	}

	render() {
		return this.props.awards ? (
			<div className="movieAwards-wrapper">
				{this.props.awards.map((item, index) => (
					<AwardItem
						key={index}
						title={item.award}
						nominations={item.titlesAwards[0]}
					/>
				))}
			</div>
		) : (
			<Spinner />
		);
	}
}

export default MovieSeriesAwards;
