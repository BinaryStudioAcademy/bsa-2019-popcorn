import React, { useEffect } from 'react';
import { Bar, ResponsiveBar } from '@nivo/bar';
import Spinner from '../../shared/Spinner';
import './MovieSeriesStatistics.scss';

interface IProps {
	statistics: any;
	fetchStatistics: () => void;
}

const MovieSeriesStatistics: React.FC<IProps> = ({
	statistics,
	fetchStatistics
}) => {
	useEffect(() => {
		fetchStatistics();
	}, []);
	console.log(statistics);
	if (!statistics) return <Spinner />;
	return (
		<div className="movie-series-statistics">
			<ResponsiveBar
				data={statistics}
				keys={['count']}
				indexBy={'rate'}
				// groupMode="grouped"
				margin={{ top: 10, right: 50, bottom: 50, left: 100 }}
				padding={0.3}
				layout="horizontal"
				colors={{ scheme: 'nivo' }}
				labelSkipWidth={12}
				minValue="auto"
				maxValue="auto"
				labelSkipHeight={12}
				labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
				animate={true}
				motionStiffness={90}
				motionDamping={15}
				tooltip={({ id, value, color }) => (
					<strong style={{ color }}>
						{id}: {value}
					</strong>
				)}
			/>
		</div>
	);
};

export default MovieSeriesStatistics;
