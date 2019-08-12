import React from 'react';
import StaffList from '../StaffList/StaffList';
import CastList from '../CastList/CastList';
import './StaffCast.scss';
const StaffCast = () => {
	return (
		<div className="staff-cast">
			<CastList />
			<StaffList />
		</div>
	);
};

export default StaffCast;
