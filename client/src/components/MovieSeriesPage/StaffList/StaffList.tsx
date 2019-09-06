import React from 'react';
import StaffItem from '../StaffItem/StaffItem';
import './StaffList.scss';
import { StaffItemInfo } from './StaffType';

type StaffListProps = {
	crew: Array<StaffItemInfo>;
};

const generateStaffArray = (
	staff: Array<{ name: string; job: string; profile_path: string }>
) => {
	const neededJobs = [
		'Director',
		'Story',
		'Executive producer',
		'Script Supervisor',
		'Music by',
		'Editor',
		'Casting',
		'Stunts',
		'Costume Design',
		'Director of Photography'
	];
	let neededStaff: Array<{
		name: string;
		job: string;
		profile_path: string;
	}> = [];
	for (let i = 0; i < neededJobs.length; i++) {
		const staffWithOneJob = staff
			.filter(el => el.job === neededJobs[i])
			.map(el => {
				return { name: el.name, profile_path: el.profile_path, job: el.job };
			});
		staffWithOneJob.map(el => neededStaff.push(el));
	}
	return neededStaff;
};

const StaffList = ({ crew }: StaffListProps) => {
	let groupedStaff = generateStaffArray(crew);
	return (
		<div className={'staff-list'}>
			<div className={'staff-list-header'}>
				<span>Crew</span>
			</div>
			<div className={'staff-items-container'}>
				{groupedStaff.map((el, index) => (
					<StaffItem staffItemInfo={el} key={index} />
				))}
			</div>
		</div>
	);
};

export default StaffList;
