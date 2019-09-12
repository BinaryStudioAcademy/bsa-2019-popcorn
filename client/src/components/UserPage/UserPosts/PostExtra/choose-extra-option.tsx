import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleLeft,
	faTimesCircle,
	faTimes,
	faPlus
} from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router';
import { fetchSurveys } from '../../UserSurveys/UserSurveys.redux/actions';
import { getAllEvents } from '../../UserEvents/actions';
import { fetchTops } from '../../UserTops/UserTops.redux/actions';
import { connect } from 'react-redux';
import Spinner from '../../../shared/Spinner';

interface IProps {
	option: string;
	survey: any;
	userEvents: any;
	topList: any;
	loading: boolean;
	userInfo: {
		id: string;
	};
	toggleModalOption: (data: any) => any;
	setExtra: (data: any) => any;
	fetchSurveys: (id: string) => any;
	getAllEvents: (id: string) => any;
	fetchTops: (id: string) => any;
}

class ChooseExtraOption extends React.Component<IProps> {
	state = {
		create: true
	};

	componentDidMount() {
		switch (this.props.option) {
			case 'survey':
				this.props.fetchSurveys(this.props.userInfo.id);
				break;
			case 'event':
				this.props.getAllEvents(this.props.userInfo.id);
				break;
			case 'top':
				this.props.fetchTops(this.props.userInfo.id);
				break;
		}
	}

	setOption(data) {
		this.props.setExtra(data);
		this.props.toggleModalOption(data);
	}

	render() {
		const { option, survey, userEvents, topList, loading } = this.props;

		let data: any = null;

		switch (this.props.option) {
			case 'survey':
				data = survey ? [...survey] : survey;
				break;
			case 'event':
				data = userEvents ? [...userEvents] : userEvents;
				break;
			case 'top':
				data = topList ? [...topList] : topList;
				break;
		}

		if (!this.state.create) {
			return option === 'survey' ? (
				<Redirect
					to={{
						pathname: `/user-page/${this.props.userInfo.id}/${option}s/create/questions`
					}}
				/>
			) : (
				<Redirect
					to={{
						pathname: `/user-page/${this.props.userInfo.id}/${option}s`
					}}
				/>
			);
		}
		const create = () => this.setState({ create: false });
		console.log(data);
		return (
			<div className={'post-constructor-modal'}>
				<div className="postconstr-wrp postconstr-wrp--option">
					<p className="close-modal" onClick={this.props.toggleModalOption}>
						<FontAwesomeIcon icon={faTimes} />
					</p>
					<div className={'choose-extra-option-wrp postconstr'}>
						<div className={'create'} onClick={create}>
							<span style={{ cursor: 'pointer' }}>
								<FontAwesomeIcon icon={faPlus} className="extra-icon" />
								Create {option}
							</span>
						</div>

						<div className={'recent-created'}>
							{data ? (
								data.map((item, i) => (
									<p
										key={item.id}
										className="option-item-wrapper"
										onClick={() =>
											this.setOption({
												type: this.props.option,
												data: item,
												link:
													option === 'survey'
														? `/${option}-page/${item.id}`
														: `/${option}s/${item.id}`
											})
										}
									>
										<span className="option-item" key={i}>
											{item.title}
										</span>
									</p>
								))
							) : (
								<Spinner />
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = rootState => ({
	survey: rootState.survey.surveys,
	loading: rootState.survey.loading,
	userEvents: rootState.events.allEvents,
	userInfo: rootState.profile.profileInfo,
	topList: rootState.userTops.topList
});

const mapDispatchToProps = {
	fetchSurveys,
	getAllEvents,
	fetchTops
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChooseExtraOption);
