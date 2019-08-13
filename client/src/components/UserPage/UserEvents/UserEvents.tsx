import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from '../../shared/Spinner/index';
import { getUserEvents } from './actions';

interface IProps {
	userEvents: any;
	getUserEvents: (id: string) => any;
	currentUserId: string;
}

class UserEvents extends React.PureComponent<IProps> {
	constructor(props) {
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
				{userEvents ? <div>USEREVENTS</div> : <Spinner />}
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
