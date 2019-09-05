import React from 'react';
import RecommendItemEvent from './RecommendItemEvent/RecommendItemEvent';
import RecommendItemTop from './RecommendItemTop/RecommendItemTop';
import RecommendItemSurvey from './RecommendItemSurvey/RecommendItemSurvey';
import RecommendItemReview from './RecommendItemReview/RecommendItemReview';
import './RecommendList.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchRecommended } from './RecommendList.redux/actions';
import ReviewItem from '../../MovieSeriesPage/MovieSeriesReviews/ReviewItem/ReviewItem';
import { NavLink } from 'react-router-dom';
import TopListItem from '../../TopListPage/TopListItem';
import EventItem from '../../UserPage/UserEvents/EventItem/EventItem';
import { formatToClient } from '../../UserPage/UserEvents/UserEvents.service';
import { setReaction } from '../../MovieSeriesPage/MovieSeriesReviews/actions';

type RecommendList = {
	recommended: any;
	fetchRecommended: (userId: string) => any;
	userId: string;
	setReaction: (reviewId: string, isLike: boolean) => object;
};

const RecommendList = ({
	recommended,
	fetchRecommended,
	userId,
	setReaction
}: RecommendList) => {
	if (!recommended) {
		fetchRecommended(userId);
	}

	if (recommended && recommended.events) {
		recommended.events = formatToClient(recommended.events);
		console.log(recommended.tops);
	}

	return recommended ? (
		<div className="recommend-list">
			<div className="recommend-heading">
				<FontAwesomeIcon icon={faStar} />
				<span>Recommended </span>
			</div>
			{recommended.surveys ? (
				<div>
					<NavLink
						className="survey-link"
						style={{ textDecoration: 'none' }}
						to={`/survey-page/${recommended.surveys.id}`}
					>
						<RecommendItemSurvey survey={recommended.surveys} />
					</NavLink>
				</div>
			) : null}
			{recommended.events ? (
				<div>
					<NavLink
						className="survey-link"
						style={{ textDecoration: 'none' }}
						to={`/events/${recommended.events.id}`}
					>
						<RecommendItemEvent event={recommended.events} />
					</NavLink>
				</div>
			) : null}
			{recommended.tops ? (
				<div>
					<RecommendItemTop top={recommended.tops} />
				</div>
			) : null}
			{recommended.reviews[0] ? (
				<div>
					<RecommendItemReview
						review={recommended.reviews[0]}
						currUserId={userId}
						setReaction={setReaction}
					/>
				</div>
			) : null}
		</div>
	) : null;
};

const mapStateToProps = (rootState, props) => ({
	...props,
	recommended: rootState.recommended.recommended,
	userId: rootState.profile.profileInfo.id
});

const actions = {
	fetchRecommended,
	setReaction
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecommendList);
