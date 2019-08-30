import React from 'react';
import StaffList from '../StaffList/StaffList';
import CastList from '../CastList/CastList';
import './StaffCast.scss';
import Spinner from '../../shared/Spinner';
import TMovie from '../../MovieSeriesPage/TMovie';

type StaffCastProps = {
	movie: TMovie;
};

class StaffCast extends React.Component<StaffCastProps> {
	constructor(props) {
		super(props);
	}

	render() {
		return this.props.movie ? (
			<div className="staff-cast">
				<CastList cast={this.props.movie.cast} />
				<StaffList crew={this.props.movie.crew} />
			</div>
		) : (
			<Spinner />
		);
	}
}

export default StaffCast;
