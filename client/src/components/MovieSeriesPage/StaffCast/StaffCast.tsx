import React from 'react';
import StaffList from '../StaffList/StaffList';
import CastList from '../CastList/CastList';
import './StaffCast.scss';
import Spinner from '../../shared/Spinner';

type StaffCastProps = {
	fetchCastCrew: (id: any) => any;
	movieId: any;
	crewCast: any;
};

class StaffCast extends React.Component<StaffCastProps> {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		if (this.props.crewCast === null)
			this.props.fetchCastCrew(this.props.movieId);
	}

	render() {
		return this.props.crewCast ? (
			<div className="staff-cast">
				<CastList cast={this.props.crewCast.cast} />
				<StaffList crew={this.props.crewCast.crew} />
			</div>
		) : (
			<Spinner />
		);
	}
}

export default StaffCast;
