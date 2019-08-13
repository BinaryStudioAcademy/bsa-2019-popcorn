import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../../shared/Spinner/index';
import { getUserEvents } from './actions';

interface IProps {
	userEvents: IEvent[];
	getUserEvents: (id: string) => any;
	currentUserId: string;
}

interface IEvent {
	id: string;
	title: string;
	description: string;
	location: {
		lat: number;
		lng: number;
	};
	dateRange: {
		start: Date;
		end: Date;
	};
	userId: string;
	movieId: string | undefined;
	eventVisitors: IVisitor[];
}

interface IVisitor {
	id: string;
	status: string;
	userId: string;
	eventId: string;
}

class UserEvents extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
	}

	componentDidMount() {
		const { currentUserId } = this.props;
		this.props.getUserEvents(currentUserId);
	}

	render() {
		const { userEvents } = this.props;

		return (
			<div className="UserEvents">
				{userEvents ? (
					<div className="event-list-container"></div>
				) : (
					<Spinner />
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		...props,
		currentUserId: state.profile.profileInfo.id,
		userEvents: state.events.userEvents
	};
};

const mapDispatchToProps = dispatch => {
	const actions = {
		getUserEvents
	};

	return bindActionCreators(actions, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserEvents);
