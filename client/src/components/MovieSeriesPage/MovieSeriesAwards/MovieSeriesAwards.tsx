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
	mockedAwards = [
		{
			isWinner: true,
			title: 'Teen Choice Awards',
			year: 2004,
			nominationName: 'Choice Breakout Movie Star',
			gender: 'Female',
			winnerName: 'Lindsey Lohan'
		},
		{
			isWinner: false,
			title: 'Teen Choice Awards',
			year: 2004,
			nominationName: 'Choice Breakout Movie Star',
			gender: 'Male'
		},
		{
			isWinner: false,
			title: 'Teen Choice Awards',
			year: 2004,
			nominationName: 'Choice Breakout Movie Star',
			gender: 'Male'
		}
	];
	componentDidMount() {
		this.props.fetchAwards(this.props.imdbId);
	}
	render() {
		this.props.awards ? console.log(this.props.awards[0]) : console.log('hi');
		return this.props.awards ? (
			<div className="movieAwards-wrapper">
				{this.props.awards.map(item => (
					<AwardItem title={item.award} nominations={item.titlesAwards[0]} />
				))}
			</div>
		) : (
			<Spinner />
		);
	}
}

export default MovieSeriesAwards;
