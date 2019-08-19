import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleLeft,
	faTimesCircle,
	faPlus
} from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router';
import { fetchSurveys } from '../UserSurveys/UserSurveys.redux/actions';
import { connect } from 'react-redux';

interface IProps {
	option: string;
	survey: any;
	loading: boolean;
	toggleModalOption: (data: any) => any;
	setExtra: (data: any) => any;
	fetchSurveys: () => any;
}

const mock = [
	{
		name: 'Big Title 1'
	},
	{
		name: 'Title 2'
	},
	{
		name: 'Title 3'
	}
];

class ChooseExtraOption extends React.Component<IProps> {
	state = {
		create: true
	};

	componentDidMount() {
		this.props.fetchSurveys();
	}

	setOption(data) {
		this.props.setExtra(data);
	}

	render() {
		const { option, survey = [], loading } = this.props;

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
						{!loading
							? survey.map((item, i) => (
									<span
										key={i}
										onClick={() =>
											this.setOption({ title: item.title, link: item.id })
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
	loading: rootState.survey.loading
});

const mapDispatchToProps = {
	fetchSurveys
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChooseExtraOption);
