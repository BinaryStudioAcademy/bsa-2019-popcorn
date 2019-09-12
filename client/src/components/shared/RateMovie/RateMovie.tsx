import React, { ObjectHTMLAttributes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserRates, saveUserRate, deleteUserRate } from './actions';
import StarRating from './StarRating/StarRating';

interface IProps {
	userRates: IUserRate[];
	fetchUserRates: () => object;
	movieId: string;
	saveUserRate: (userRate: any) => object;
	deleteUserRate: (userRate: any) => object;
	currentUserId: string;
	updateTotalRate?: (prevUserRate: any, rate: any) => any;
	isLoading?: boolean;
}

interface IUserRate {
	id: string;
	movieId: string;
	userId: string;
	rate: string;
}

const RateMovie: React.FC<IProps> = ({
	userRates,
	fetchUserRates,
	movieId,
	saveUserRate,
	deleteUserRate,
	currentUserId,
	updateTotalRate,
	isLoading
}) => {
	if (!userRates && !isLoading) {
		fetchUserRates();
	}

	if (!userRates) {
		return null;
	}

	const userRate = userRates.find(
		rate => String(rate.movieId) === String(movieId)
	);

	return (
		<StarRating
			deleteUserRate={deleteUserRate}
			saveUserRate={saveUserRate}
			size={10}
			userRate={userRate}
			currentUserId={currentUserId}
			movieId={movieId}
			updateTotalRate={updateTotalRate}
		/>
	);
};

const mapStateToProps = (rootState, props) => ({
	...props,
	userRates: rootState.movieRate.userRates,
	currentUserId: rootState.profile.profileInfo.id,
	isLoading: rootState.movieRate.isLoading
});

const mapDispatchToProps = dispatch => {
	const actions = {
		fetchUserRates,
		saveUserRate,
		deleteUserRate
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RateMovie);
