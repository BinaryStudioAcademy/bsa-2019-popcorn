import React from 'react';
import MovieSeriesPageHeader from './MovieSeriesPageHeader';
import MovieSeriesPageTabs from './MovieSeriesPageTabs';
import MovieSeriesPageTabBody from './MovieSeriesPageTabBody';
import './MovieSeriesPage.scss';
import { Redirect } from 'react-router';
import TMovie from './TMovie';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
interface IProps {
	movie: TMovie;
	avatar?: string;
	userId: string;
	username: string;
}

const MovieSeriesPage: React.SFC<IProps> = ({
	movie,
	avatar,
	userId,
	username
}) => {
	const mainPath = '/movie-series';
	return movie ? (
		<div className="movie-series-page">
			<MovieSeriesPageHeader movieSeriesData={movie} />
			<MovieSeriesPageTabs mainPath={mainPath} />
			<MovieSeriesPageTabBody
				mainPath={mainPath}
				movie={movie}
				userInfo={{ avatar, userId, username }}
			/>
		</div>
	) : (
		<Redirect to={'/movie-list'} />
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	avatar: rootState.profile.profileInfo && rootState.profile.profileInfo.avatar,
	userId: rootState.profile.profileInfo && rootState.profile.profileInfo.id,
	username: rootState.profile.profileInfo && rootState.profile.profileInfo.name
});

const actions = {};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieSeriesPage);
