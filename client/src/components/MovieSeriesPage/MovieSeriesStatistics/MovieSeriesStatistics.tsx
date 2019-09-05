import React, { useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
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
	if (!statistics) {
		return <Spinner />;
	}
	const averageStatistics = statistics.averageStatistics;
	return (
		<div className="movie-series-statistics">
			{statistics.statisticsByRate.length !== 0 && (
				<div style={{ height: 600 }}>
					<div className="statistics-title">PopCorn users rating</div>
					<ResponsiveBar
						data={statistics.statisticsByRate}
						keys={['users']}
						indexBy={'rate'}
						// groupMode="grouped"
						enableGridY={false}
						margin={{ right: 50, bottom: 300, left: 50 }}
						padding={0.1}
						layout="horizontal"
						colors={'rgba(255, 101, 1, 0.4)'}
						labelSkipWidth={12}
						minValue="auto"
						maxValue="auto"
						labelSkipHeight={12}
						labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
						animate={true}
						motionStiffness={90}
						motionDamping={15}
						axisBottom={null}
						axisLeft={{ tickSize: 0, legendOffset: -30 }}
						tooltip={({ id, value, color }) => (
							<strong style={{ color }}>
								{value} {'votes'}
							</strong>
						)}
					/>
				</div>
			)}
			{statistics.averageStatistics.length !== 0 && (
				<div className="average-statistics">
					<div className="statistics-title">PopCorn average rating</div>
					<div className="average-statistics-content">
						<div className="average-statistics-item">
							<div className="average-statistics-item-title">All</div>
							<div className="average-statistics-item-content">
								<div className="item-content-average">
									{(+averageStatistics[0].average +
										+averageStatistics[0].average) /
										2}
								</div>
								<div className="item-content-count">
									{+averageStatistics[0].count + +averageStatistics[0].count}
								</div>
							</div>
						</div>
						<div className="average-statistics-item">
							<div className="average-statistics-item-title">Female</div>
							<div className="average-statistics-item-content">
								<div className="item-content-average">
									{averageStatistics[0].average}
								</div>
								<div className="item-content-count">
									{averageStatistics[0].count}
								</div>
							</div>
						</div>
						<div className="average-statistics-item">
							<div className="average-statistics-item-title">Male</div>
							<div className="average-statistics-item-content">
								<div className="item-content-average">
									{averageStatistics[1].average}
								</div>
								<div className="item-content-count">
									{averageStatistics[1].count}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MovieSeriesStatistics;
