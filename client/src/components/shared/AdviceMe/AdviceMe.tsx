import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TMovie from '../../MovieSeriesPage/TMovie';
import Spinner from '../Spinner';
import MovieCardItem from './MovieCardItem/AdviceMeItem';
import { fetchAdvice, setNewRateInfo } from '../Header/actions';
import './AdviceMe.scss';

interface IProps {
	loading: boolean;
	movieAdvice: TMovie[];
	fetchAdvice: (userId: string) => any;
	profileInfo: any;
	setNewRateInfo: (rateInfo: string) => object;
}

const AdviceMe: React.FC<IProps> = ({
	fetchAdvice,
	profileInfo,
	loading,
	movieAdvice,
	setNewRateInfo
}) => {
	if (!loading && !movieAdvice) {
		fetchAdvice(profileInfo.id);
		return null;
	}

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className="AdviceMe">
			<div className="advice-me-container">
				{movieAdvice.map(movie => (
					<MovieCardItem
						setNewRateInfo={setNewRateInfo}
						movie={movie}
						key={movie.id}
					/>
				))}
			</div>
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
	fetchAdvice,
	setNewRateInfo
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdviceMe);
