import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleLeft,
	faTimesCircle,
	faPlus
} from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router';
import { fetchSurveys } from '../UserSurveys/UserSurveys.redux/actions';
import { getUserEvents } from '../UserEvents/actions';
import { connect } from 'react-redux';

interface IProps {
	option: string;
	survey: any;
	userEvents: any;
	loading: boolean;
	userInfo: {
		id: string;
	};
	toggleModalOption: (data: any) => any;
	setExtra: (data: any) => any;
	fetchSurveys: () => any;
	getUserEvents: (data: string) => any;
}

class ChooseExtraOption extends React.Component<IProps> {
	state = {
		create: true
	};

	componentDidMount() {
		switch (this.props.option) {
			case 'survey':
				this.props.fetchSurveys();
				break;
			case 'event':
				this.props.getUserEvents(this.props.userInfo.id);
				break;
		}
	}

	setOption(data) {
		this.props.setExtra(data);
	}

	render() {
		const { option, survey = [], userEvents = [], loading } = this.props;

		let data: any = [];

		switch (this.props.option) {
			case 'survey':
				data = [...survey];
				break;
			case 'event':
				data = [...userEvents];
				break;
		}

		if (!this.state.create)
			return (
				<Redirect
					to={{
						pathname: `/user-page/${option}s`
					}}
				/>
			);

		const create = () => this.setState({ create: false });

		return (
			<div className={'modal modal-story'}>
				<div className={'nav-block-wrp'}>
					<span onClick={this.props.toggleModalOption}>
						<FontAwesomeIcon
							icon={faArrowCircleLeft}
							className={'fontAwesomeIcon'}
						/>
					</span>
					<span onClick={this.props.toggleModalOption}>
						<FontAwesomeIcon
							icon={faTimesCircle}
							className={'fontAwesomeIcon'}
						/>
					</span>
				</div>
				<div className={'choose-extra-option-wrp'}>
					<div className={'create'} onClick={create}>
						<span>
							<FontAwesomeIcon
								icon={faPlus}
								style={{ marginRight: '2px', fontSize: '.8em' }}
							/>
							Create {option}
						</span>
					</div>

					<div className={'recent-created'}>
						{data
							? data.map((item, i) => (
									<span
										key={i}
										onClick={() =>
											this.setOption({
												title: item.title,
												link: `/${option}-page/${item.id}`
											})
										}
									>
										{item.title}
									</span>
							  ))
							: null}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = rootState => ({
	survey: rootState.survey.surveys,
	loading: rootState.survey.loading,
	userEvents: rootState.events.userEvents,
	userInfo: rootState.profile.profileInfo
});

const mapDispatchToProps = {
	fetchSurveys,
	getUserEvents
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChooseExtraOption);
