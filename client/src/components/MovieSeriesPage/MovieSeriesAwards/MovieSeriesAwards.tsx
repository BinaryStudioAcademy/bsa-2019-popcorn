import React, { Component } from 'react';
import AwardItem from './AwardItem/AwardItem';
import './MovieSeriesAwards.scss';
class MovieSeriesAwards extends Component<Component> {
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
	render() {
		return (
			<div className="movieAwards-wrapper">
				{this.mockedAwards.map(item => (
					<AwardItem
						isWinner={item.isWinner}
						title={item.title}
						year={item.year}
						nominationName={item.nominationName}
						gender={item.gender}
						winnerName={item.winnerName}
					/>
				))}
			</div>
		);
	}
}

export default MovieSeriesAwards;
