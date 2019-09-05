import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TMovie from '../../MovieSeriesPage/TMovie';
import Spinner from '../Spinner';
import MovieCardItem from './movieCardItem';
import { fetchAdvice } from '../Header/actions';

interface IProps {
	loading: boolean;
	movieAdvice: TMovie[];
	fetchAdvice: (userId: string) => any;
	profileInfo: any;
}

const AdviceMe = (props: IProps) => {
	const { loading, movieAdvice } = props;

	if (!loading && !movieAdvice) {
		props.fetchAdvice(props.profileInfo.id);
		return null;
	}
	return loading ? (
		<Spinner />
	) : (
		<div className={'movie-card-wrp'}>
			{movieAdvice.map(movie => (
				<MovieCardItem movie={movie} key={movie.id} />
			))}
		</div>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	loading: rootState.notification.loading,
	movieAdvice: rootState.notification.movieAdvice,
	profileInfo: rootState.profile.profileInfo
});

const actions = {
	fetchAdvice
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdviceMe);
