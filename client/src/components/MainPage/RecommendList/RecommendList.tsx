import React from 'react';
import RecommendItem from '../RecommendItem/RecommendItem';
import './RecommendList.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchRecommended } from './RecommendList.redux/actions';
import ReviewItem from '../../MovieSeriesPage/MovieSeriesReviews/ReviewItem/ReviewItem';
import { NavLink } from 'react-router-dom';
import TopList from '../../TopListPage/TopList';
import EventItem from '../../UserPage/UserEvents/EventItem/EventItem';
import { formatToClient } from '../../UserPage/UserEvents/UserEvents.service';
import { setReaction } from '../../MovieSeriesPage/MovieSeriesReviews/actions';

type RecommendList = {
	recommended: any;
	fetchRecommended: (userId: string) => any;
	userId: string;
	setReaction: (reviewId: string, isLike: boolean) => object;
};

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

const transformTops = tops => {
	let newTops = tops.map(el => {
		return {
			id: el.id,
			title: el.title,
			topImageUrl: el.topImageUrl,
			created_at: el.created_at,
			user: {
				id: el.userId,
				avatar: el.avatar,
				name: el.name
			}
		};
	});
	return newTops;
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

	if (recommended) {
		recommended.events = formatToClient(recommended.events);
		console.log(recommended.tops);
	}

	return recommended ? (
		<div className="recommend-list">
			<div className="recommend-heading">
				<FontAwesomeIcon icon={faStar} />
				<span>Recommended </span>
			</div>
			<div>
				<div>Recommended survey : </div>
				<NavLink
					className="survey-link"
					style={{ textDecoration: 'none' }}
					to={`/survey-page/${recommended.surveys[1].id}`}
				>
					<div className="survey-list-item">
						<span>{recommended.surveys[1].title}</span>
					</div>
				</NavLink>
			</div>
			<div>
				<div>Recommended event:</div>
				<EventItem event={recommended.events} isOwnEvent={false} />
			</div>
			<div>
				<div>Recommended top:</div>
				<TopList passedTop={recommended.tops} />
			</div>
			<div>
				<div>Recommended review:</div>
				<ReviewItem
					currentUserId={userId}
					review={recommended.reviews[0]}
					setReaction={setReaction}
				/>
			</div>
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
